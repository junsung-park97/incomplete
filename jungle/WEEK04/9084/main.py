import sys

input = sys.stdin.readline

t = int(input())

for _ in range(t):
    n = int(input().rstrip())
    coins = list(map(int, input().rstrip().split()))
    m = int(input().rstrip())
    
    # DP 테이블 초기화
    dp = [0] * (m + 1)
    dp[0] = 1  # 0원을 만드는 방법은 1가지 (아무 동전도 사용 안 함)
    
    # 각 동전에 대해 순차적으로 처리
    for coin in coins:
        # 해당 동전을 사용해서 만들 수 있는 모든 금액 갱신
        for amount in range(coin, m + 1):
            dp[amount] = dp[amount] + dp[amount - coin]
            # dp[amount] += dp[amount - coin]
        # print(dp)
    
    print(dp[m])