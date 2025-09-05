import sys

input = sys.stdin.readline

n, k = map(int, input().rstrip().split())
coins = []

for _ in range(n):
    coin = int(input())
    coins.append(coin)

count = 0

# 큰 동전부터 사용 (그리디)
for i in range(n-1, -1, -1):
    if k >= coins[i]:
        count += k // coins[i]  # 해당 동전을 최대한 사용
        k %= coins[i]           # 나머지 금액 계산

    if k == 0:
        break

print(count)
