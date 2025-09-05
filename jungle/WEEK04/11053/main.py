import sys

input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

dp = [1] * n

for i in range(1, n):
    for j in range(i):
        if arr[j] < arr[i]:
            dp[i] = max(dp[i], dp[j] + 1)

print(max(dp))

#   단계별 DP 테이블 채우기:

#   i=0 (값: 10):
#   - 이전 원소 없음 → dp[0] = 1

#   i=1 (값: 9):
#   - j=0: 10 > 9 → 연결 불가
#   - dp[1] = 1

#   i=2 (값: 2):
#   - j=0,1: 10,9 > 2 → 연결 불가
#   - dp[2] = 1

#   i=3 (값: 5):
#   - j=0,1: 10,9 > 5 → 연결 불가
#   - j=2: 2 < 5 → dp[3] = max(1, dp[2]+1) = 2
#   - 의미: [2, 5] 수열

#   i=4 (값: 3):
#   - j=2: 2 < 3 → dp[4] = max(1, dp[2]+1) = 2
#   - 의미: [2, 3] 수열

#   i=5 (값: 7):
#   - j=2: 2 < 7 → dp[5] = max(1, 1+1) = 2
#   - j=3: 5 < 7 → dp[5] = max(2, 2+1) = 3
#   - j=4: 3 < 7 → dp[5] = max(3, 2+1) = 3
#   - 의미: [2, 5, 7] 수열

#   핵심: 각 dp[i]는 "i에서 끝나는 최적해"를 저장하고, 전체 답은
#   max(dp)입니다.