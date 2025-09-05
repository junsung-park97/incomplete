/*
 * mm-naive.c - The fastest, least memory-efficient malloc package.
 *
 * In this naive approach, a block is allocated by simply incrementing
 * the brk pointer.  A block is pure payload. There are no headers or
 * footers.  Blocks are never coalesced or reused. Realloc is
 * implemented directly using mm_malloc and mm_free.
 *
 * NOTE TO STUDENTS: Replace this header comment with your own header
 * comment that gives a high level description of your solution.
 */
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <unistd.h>
#include <string.h>

#include "mm.h"
#include "memlib.h"

/*********************************************************
 * NOTE TO STUDENTS: Before you do anything else, please
 * provide your team information in the following struct.
 ********************************************************/
team_t team = {
    /* Team name */
    "ateam",
    /* First member's full name */
    "Harry Bovik",
    /* First member's email address */
    "bovik@cs.cmu.edu",
    /* Second member's full name (leave blank if none) */
    "",
    /* Second member's email address (leave blank if none) */
    ""};

/* 싱글 워드(4) 또는 더블 워드(8) 정렬 */
#define ALIGNMENT 8

/* ALIGNMENT의 가장 가까운 배수로 올림(반올림) */
#define ALIGN(size) (((size) + (ALIGNMENT - 1)) & ~0x7)
#define SIZE_T_SIZE (ALIGN(sizeof(size_t)))

// 메크로 정의
// 상수
#define WSIZE 4 // 워드 헤더 and 푸터의 크기 (바이트)
#define DSIZE 8 // 더블 워드 사이즈(바이트)
#define CHUNKSIZE (1<<9) // 힙 확장을 위한 기본크기(바이트)
#define MAX(x, y) ((x) > (y) ? (x) : (y))
// 크기와 할당 비트를 통합해서 헤더와 푸터에 저장할 수 있는 값을 리턴
#define PACK(size, alloc) ((size) | (alloc))
// 주소 p가 참조하는 워드를 읽어서 리턴
#define GET(p) (*(unsigned int *)(p))
// 주소 p가 가리키는 워드에 val을 저장
#define PUT(p, val) (*(unsigned int *)(p) = (unsigned int)(val))
//각각 주소 p에 있는 블록의 size리턴
#define GET_SIZE(p) (GET(p) & ~0x7)
// 헤더의 마지막비트 할당상태를 리턴
#define GET_ALLOC(p) (GET(p) & 0x1)
// 블록포인터 bp가 주어지면, 각각 해당 헤더와 푸터를 가리키는 포인터를 리턴한다.
#define HDRP(bp) ((char*)(bp) - WSIZE)
#define FTRP(bp) (((char*)(bp)) + GET_SIZE(HDRP(bp)) - DSIZE)
// 블록포인터 bp가 주어지면, 다음블록과 이전블록의 포인터를 각각 리턴한다.
#define NEXT_BLKP(bp) ((char*)(bp) + GET_SIZE((char*)(bp) - WSIZE))
#define PREV_BLKP(bp) ((char*)(bp) - GET_SIZE((char*)(bp) - DSIZE))

//----------전역함수 선언----------
static void* coalesce(void* bp);
static void *extend_heap(size_t words);
static void* find_fit(size_t asize);
static void* first_fit (size_t asize);
static void* next_fit (size_t asize);
static void place(void* bp, size_t asize);
//----------전역변수 선언---------
static char* heap_list;
static void* last_bp;




/*
 * mm_init - malloc 패키지를 초기화합니다
 */

// 힙의 첫번째 주소를 가리키는 포인터

int mm_init(void)
{
    // 초기 빈 힙을 생성한다. heap_list는 전역변수
    if ((heap_list = mem_sbrk(4*WSIZE)) == (void*)-1) {
        return -1;
    }

    // 이 작업을 왜 해주는거지? PUT은 페이로드, PACK은 헤더와 푸터느낌인건가?
    PUT(heap_list, 0);
    PUT(heap_list + (1*WSIZE), PACK(DSIZE, 1));
    PUT(heap_list + (2*WSIZE), PACK(DSIZE, 1));
    PUT(heap_list + (3*WSIZE), PACK(0, 1));
    heap_list += (2*WSIZE);
    last_bp = NULL;

    // 빈 힙을 CHUNKSIZE크기의 사용 가능 블록으로 확장합니다.
    if(extend_heap(CHUNKSIZE/WSIZE) == NULL){
        return -1;
    }

    return 0;
}


void *mm_malloc(size_t size)
{
    size_t asize;
    size_t extendsize;
    char* bp;

    if (size == 0)
    {
        return NULL;
    }

    if (size <= DSIZE)
    {
        asize = 2 * DSIZE;
    }
    else
    {
        // 왜? DSIZE - 1은 이해가 안되는데? -> 올림연산
        asize = DSIZE * ((size + (DSIZE) + (DSIZE - 1)) / DSIZE);
    }

    if ((bp = find_fit(asize)) != NULL)
    {
        place(bp, asize);
        return bp;
    }

    extendsize = MAX(asize, CHUNKSIZE);
    if ((bp = extend_heap(extendsize / WSIZE)) == NULL)
    {
        return NULL;
    }
    place(bp,asize);
    return bp;
}

/*
 * mm_free - Freeing a block does nothing.
 */
void mm_free(void *ptr)
{
    size_t size = GET_SIZE(HDRP(ptr));

    PUT(HDRP(ptr), PACK(size, 0));
    PUT(FTRP(ptr), PACK(size, 0));
    coalesce(ptr);
}

/*
 * mm_realloc - Implemented simply in terms of mm_malloc and mm_free
 */
// 말록으로 할당받은 메모리를 realloc을 사용하여 크기를 변경, 크기를 변경하려면 메모리도 복사해야됨
void *mm_realloc(void *ptr, size_t size)
{
    //
    // 현재블럭의 크기와 다음블럭의 할당유무 확인
    // 현재블럭의 크기와 다음블럭의 크기가 요청크기보다 크거나 같으면 제자리 할당
    // 아니면 말록으로 새로운 할당후 메모리복사
    // 기존 메모리 복사가 비용이 가장 적지만, 안되면 뒷블럭의 메모리와 병합하는것이 비용측면에서 이득이고, 그것도 안되면 이 전 메모리에 병합하는것이 비용측면 최선이다.
    // 이전블럭으로 메모리를 밀어넣는것이 공간효율성 측면에서 이득이 될 수도?있다.

    void *cur_ptr = ptr;
    void *next_ptr = NEXT_BLKP(ptr);
    void *prev_ptr = PREV_BLKP(ptr);
    void *new_ptr;
    void *split_bp = NEXT_BLKP(prev_ptr);
    size_t old_size = GET_SIZE(HDRP(ptr)); 
    size_t copy_size = GET_SIZE(HDRP(cur_ptr)) - DSIZE;;
    size_t asize;
    size_t current_size = GET_SIZE(HDRP(ptr));
    size_t next_size = GET_SIZE(HDRP(next_ptr));
    size_t total_size = current_size + next_size;

    if (size <= DSIZE)
    {
        asize = 2 * DSIZE;
    }
    else
    {
        asize = DSIZE * ((size + DSIZE + (DSIZE - 1)) / DSIZE);
    }

    if (ptr == NULL) {
    return mm_malloc(size);
    }

    if (size == 0) {
        mm_free(ptr);
        return NULL;
    }

    if (size <= copy_size)
    {
        PUT(HDRP(ptr), PACK(asize, 1));
        PUT(FTRP(ptr), PACK(asize, 1));

        if ((old_size - asize) >= (2*DSIZE)) {
            void *split_bp = NEXT_BLKP(ptr);
            PUT(HDRP(split_bp), PACK(old_size - asize, 0));
            PUT(FTRP(split_bp), PACK(old_size - asize, 0));
        }

        return ptr;
    }
    else
    {
        if (!GET_ALLOC(HDRP(next_ptr)) && GET_ALLOC(HDRP(prev_ptr)) && (GET_SIZE(HDRP(next_ptr)) + copy_size) >= size)
        {
            size_t merged_size = GET_SIZE(HDRP(ptr)) + GET_SIZE(HDRP(next_ptr));
            PUT(HDRP(ptr), PACK(merged_size, 1));
            PUT(FTRP(ptr), PACK(merged_size, 1));

            // 필요하면 분할
            if ((total_size - asize) >= (2*DSIZE)) {
                PUT(HDRP(ptr), PACK(asize, 1));
                PUT(FTRP(ptr), PACK(asize, 1));
                
                void *split_bp = NEXT_BLKP(ptr);
                PUT(HDRP(split_bp), PACK(total_size - asize, 0));
                PUT(FTRP(split_bp), PACK(total_size - asize, 0));
            }

            return ptr;
        }
        else if (!GET_ALLOC(HDRP(prev_ptr)) && (GET_SIZE(HDRP(ptr)) + GET_SIZE(HDRP(prev_ptr)) >= asize))
        {
            size_t prev_total = GET_SIZE(HDRP(ptr)) + GET_SIZE(HDRP(prev_ptr));
            PUT(HDRP(prev_ptr), PACK(prev_total, 1));
            PUT(FTRP(prev_ptr), PACK(prev_total, 1));

            if ((prev_total - asize) >= (2*DSIZE)) {
                PUT(HDRP(prev_ptr), PACK(asize, 1));
                PUT(FTRP(prev_ptr), PACK(asize, 1));

                PUT(HDRP(split_bp), PACK(prev_total - asize, 0));
                PUT(FTRP(split_bp), PACK(prev_total - asize, 0)); 
            }

            memcpy(prev_ptr, ptr, (size < copy_size) ? size : copy_size);

            return prev_ptr;
        }
        else
        {
            new_ptr = mm_malloc(size);
            if (new_ptr == NULL) return NULL;
            memcpy(new_ptr, ptr, (size < copy_size) ? size : copy_size);
            mm_free(ptr);
            return new_ptr;
        }
    }

    // new_ptr = mm_malloc(size);
    // if (new_ptr == NULL)
    //     return NULL;
    // copy_size = GET_SIZE(HDRP(oldptr)) - DSIZE; // 페이로드 사이즈
    // if (size < copy_size)
    //     copy_size = size;
    // memcpy(new_ptr, oldptr, copy_size);
    // mm_free(oldptr);
    // return new_ptr;
}

// 힙의 크기를 확장하고 확장된 영역을 사용가능 블럭으로 초기화
static void *extend_heap(size_t words) {
    // 블럭포인터
    char* bp;
    // 블럭사이즈
    size_t size;

    // 확장할 메모리 크기를 워드단위로, 짝수 워드 정렬 유지, 
    size = (words % 2) ? (words + 1) * WSIZE : words * WSIZE;
    bp = mem_sbrk(size);

    if (bp == (void*)-1) {
        return NULL;
    }

    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));
    PUT(HDRP(NEXT_BLKP(bp)), PACK(0, 1));

    return coalesce(bp);
}
static void* coalesce(void* bp)
{
    size_t perv_alloc = GET_ALLOC(FTRP(PREV_BLKP(bp)));
    size_t next_alloc = GET_ALLOC(HDRP(NEXT_BLKP(bp)));
    size_t size = GET_SIZE(HDRP(bp));
    void* merged_start = bp;
    void* merged_end = (char*)bp + size;

    //case1
    if (perv_alloc && next_alloc) 
    {
        return bp;
    } 
    //case2
    else if (perv_alloc && !next_alloc) 
    {   
        size += GET_SIZE(HDRP(NEXT_BLKP(bp)));
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));

        if (last_bp > bp && last_bp < (char*)bp + size) {
        last_bp = bp;
    }
    }
    // case3
    else if (!perv_alloc && next_alloc)
    {
        size += GET_SIZE(HDRP(PREV_BLKP(bp)));
        PUT(FTRP(bp), PACK(size, 0));
        PUT(HDRP(PREV_BLKP(bp)), PACK(size, 0));
        bp = PREV_BLKP(bp);

        if (last_bp > bp && last_bp < (char*)bp + size) {
        last_bp = bp;
    }
    }
    //case4
    else
    {
        size += GET_SIZE(HDRP(PREV_BLKP(bp)))
            + GET_SIZE(FTRP(NEXT_BLKP(bp)));
        PUT(HDRP(PREV_BLKP(bp)), PACK(size, 0));
        PUT(FTRP(NEXT_BLKP(bp)), PACK(size, 0));
        bp = PREV_BLKP(bp);

        if (last_bp >= bp && last_bp < (char*)bp + size) {
        last_bp = bp;
    }
    }
    
    return bp;
}
static void* find_fit(size_t asize)
{
    void* bp;

    if (asize == 0) {
        return NULL;
    }
    if (last_bp == NULL) {
        bp = first_fit(asize);
    }
    else {
        bp = next_fit(asize);
    }
    return bp;
}

static void* first_fit (size_t asize)
{
    void* bp = NEXT_BLKP(heap_list);
    while (GET_SIZE(HDRP(bp)) > 0)
    {
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp))))
        {
            last_bp = bp;
            return bp;
        }
        bp = NEXT_BLKP(bp);
    }
    return NULL;
}
static void* next_fit (size_t asize)
{
    // void* bp = NULL;
    // void* lp = last_bp;  // 시작점 저장
    
    // // 첫 번째 순회: last_bp부터 힙 끝까지 (lp는 이동)
    // for (;GET_SIZE(HDRP(lp)) > 0; lp = NEXT_BLKP(lp))
    // {
    //     if (!GET_ALLOC(HDRP(lp)) && (asize <= GET_SIZE(HDRP(lp))))
    //     {
    //         last_bp = lp;  // 찾으면 last_bp 업데이트
    //         return lp;
    //     }
    // }
    
    // // 두 번째 순회: 힙 처음부터 원래 last_bp 직전까지
    // if (bp == NULL)
    // {
    //     for (bp = NEXT_BLKP(heap_list); (bp != last_bp) && (GET_SIZE(HDRP(bp)) > 0); bp = NEXT_BLKP(bp))
    //     {
    //         if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp))))
    //         {
    //             last_bp = bp;
    //             return bp;
    //         }
    //     }
    //     return NULL;
    // } 
    // return NULL;

    void* bp;
    void* start = last_bp;
    
    // last_bp부터 시작해서 힙 끝까지
    for (bp = last_bp; GET_SIZE(HDRP(bp)) > 0; bp = NEXT_BLKP(bp)) {
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp)))) {
            last_bp = NEXT_BLKP(bp);  // 다음 검색 시작점
            return bp;
        }
    }
    
    // 힙 시작부터 원래 위치까지
    for (bp = NEXT_BLKP(heap_list); bp < start; bp = NEXT_BLKP(bp)) {
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp)))) {
            last_bp = NEXT_BLKP(bp);  // 다음 검색 시작점
            return bp;
        }
    }
    
    return NULL;
}

static void place(void* bp, size_t asize)
{
    size_t csize = GET_SIZE(HDRP(bp));

    if ((csize - asize) >= (2*DSIZE))
    {
        PUT(HDRP(bp), PACK(asize, 1));
        PUT(FTRP(bp), PACK(asize, 1));

        void *rp = NEXT_BLKP(bp);
        PUT(HDRP(rp), PACK(csize - asize, 0));
        PUT(FTRP(rp), PACK(csize - asize, 0));
        last_bp = rp;
    } else {
        PUT(HDRP(bp), PACK(csize, 1));
        PUT(FTRP(bp), PACK(csize, 1));
        last_bp = NEXT_BLKP(bp);
    }
}
