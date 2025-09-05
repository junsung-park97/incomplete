import sys

input = sys.stdin.readline

N, r, c = map(int, input().split())

# 2의n승씩 증가하게되면 2의 n-1승이 중간좌표이다
# 미래의 내 자신아 이해안되면 해봐라

result = 0

def recur(N, r, c) :

    half = 2 ** (N-1)
    
    
    if  N == 0 :
        print(result)
        return 0
    elif  r < half and c < half:
        """1사분면"""
        result += 1
        print('1사분면 입니다')
        return recur((N-1), r, c)
    elif r > half and c < half:
        """2사분면"""
        print('2사분면 입니다')
        return 1 * half * half * recur((N-1), r, c - half)
    elif r < half and c > half:
        """3사분면"""
        print('3사분면 입니다')
        return 2 * half * half * recur((N-1), r - half, c)
    else :
        """4사분면"""
        print('4사분면 입니다')
        return 3 * half * half * recur((N - 1), r - half, c - half)
     