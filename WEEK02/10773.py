import sys

input = sys.stdin.readline

n = int(input())
nums = []

for _ in range(n):
    money = int(input())
    if money != 0:
        nums.append(money)
    else :
        nums.pop()

result = sum(nums)
print(result)