import sys

input = sys.stdin.readline

n = int(input())

if n == 1:
    print(1)
elif n == 2:
    print(2)
else:
    # DP Bottom-Up 방식
    prev2 = 1  # dp[1]
    prev1 = 2  # dp[2]
    
    for i in range(3, n + 1):
        current = (prev1 + prev2) % 15746
        prev2 = prev1
        prev1 = current
    
    print(prev1)