import sys, math

input = sys.stdin.readline

def prime(N) :
    """소수를 판별하는 함수"""
    if N == 1:
        return False
    for n in range(2, int(math.sqrt(N) + 1)):
        # n % N == 0 
        if N % n == 0 :
            return False
    return True
    
T = int(input())
# 케이스별로 입력받음
for _ in range(T):
    even_num = int(input())
    # 두 수의 중간지점을 기준으로 왼쪽과 오른쪽으로 정의
    left = even_num // 2
    right = even_num // 2
    # 나누어진 두 수를 소수판별 함수에 돌려 참이면 출력 아니면 각각의 수를 1씩 더하고 빼 다시 검사
    for i in range(even_num//2):
        if prime(left) and prime(right):
            print(left, right)
            break
        else :
            left -= 1
            right += 1


