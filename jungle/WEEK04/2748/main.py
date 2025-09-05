# import sys

# input = sys.stdin.readline

# n = int(input())

# def fibo(n):
#     # 초기값 설정
#     if n <= 1:
#         return n
    
#     #dp테이블 설정
#     dp = [0] * (n + 1)
#     #dp의 초기값 설정
#     dp[0] = 0
#     dp[1] = 1

#     for i in range(2, n + 1):
#         dp[i] = dp[i - 1] + dp[i - 2]

#     return dp[n]

# print(fibo(n))

import sys

input = sys.stdin.readline

n = int(input().rstrip())

dp = [0] * (n + 1)
dp[0] = 0
dp[1] = 1

def fibo(n):
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]

print(fibo(n))

