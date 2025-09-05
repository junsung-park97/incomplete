# # 피보나치 - 반복문
# # 작은 문제로 시작하여 큰 문제로 확장해 가기

# #DP bottom - up 구조의 가장 기본적인 구조
# def fib(n):
#     if n <= 1:
#         return n
    
#     dp = [0] * (n + 1)
#     dp[0] = 0
#     dp[1] = 1
    
#     for i in range(2, n + 1):
#         dp[i] = dp[i-1] + dp[i-2]  # 작은 것부터 차례로
    
#     return dp[n]

def detailed_bottom_up(n):
    print(f"fib({n}) Bottom-Up 계산 시작")
    
    if n <= 1:
        return n
    
    # dp 테이블 세팅
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    print(f"초기값: dp[0]={dp[0]}, dp[1]={dp[1]}")
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        print(f"dp[{i}] = dp[{i-1}] + dp[{i-2}] = {dp[i-1]} + {dp[i-2]} = {dp[i]}")
    
    print(f"최종 테이블: {dp}")
    return dp[n]

detailed_bottom_up(7)