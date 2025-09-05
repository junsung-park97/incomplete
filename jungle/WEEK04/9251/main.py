import sys

input = sys.stdin.readline

str1 = input().rstrip()
str2 = input().rstrip()

n, m = len(str1), len(str2)

dp = [[0] * (n + 1) for _ in  range(m + 1)]

# 비교대상이 알맞게 들어갔는가?
# 인덱스 범위가 맞는가? (i - 1, j - 1이 0이 아닌가?)
# 자료형이 맞는가?

for i in range(1, m + 1):
    for j in range(1, n + 1):
        # 왜 여기서 i와 j가 바뀌는거지?
        if str1[j - 1] == str2[i - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

print(dp[m][n])