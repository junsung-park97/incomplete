import sys, math

n = int(sys.stdin.readline().strip())
nums = []

for _ in range(n):
    num = int(sys.stdin.readline().strip())
    nums.append(num)
# N = n.sort()

n.sort()

#
for num in nums:
    print(num)