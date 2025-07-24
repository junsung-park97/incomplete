import sys

input = sys.stdin.readline

#array = n_list배열
#target = m
#start = n_list의 index[0]
#end = n_list의 index[n - 1]
#함수 내에서 target이 
def binary_search(array, target, start, end):
    if start > end:
        print('0')
        return None
    mid = (start + end) // 2

    # 원하는 값 찾은 경우 인덱스 반환
    if array[mid] == target:
        print('1')
        return mid
    # 원하는 값이 중간점의 값보다 작은 경우 왼쪽 부분(절반의 왼쪽 부분) 확인
    elif array[mid] > target:
        return binary_search(array, target, start, mid - 1)
    # 원하는 값이 중간점의 값보다 큰 경우 오른쪽 부분(절반의 오른쪽 부분) 확인
    else:
        return binary_search(array, target, mid + 1, end)

N = int(input())
n_list = list(map(int, input().strip().split()))

M = int(input())
m_list = list(map(int, input().strip().split()))

n_list.sort()

for m in m_list: # m을 타겟설정, m_list를 n_list에서 찾아야됨 -> n_list를 이진탐색
    binary_search(n_list, m, 0, N - 1)


    
    







# m이라는 배열을 자게 쪼개서 비교해야되는건가
# 아니면 m을 잘게 쪼게서 n에서 이분탐색을 사용해서 찾고 그걸 len(M)만큼 반복?
# 그러면 이분탐색 함수를 위에 생성하고
# 밑에 for문으로

# for m in range M :
# if m이 N에 포함이 된다면 



