import sys

N = int(sys.stdin.readline())  # 정수 개수 입력
nums = []

for _ in range(N):
    num = int(sys.stdin.readline())
    nums.append(num)

nums.sort()

print(nums)

for num in nums:
    print(num)