import sys

input = sys.stdin.readline

n = int(input())

stick = [int(input()) for _ in range(n)]
max_height = 0
count = 0
reverse_stick = list(reversed(stick))


for i in reverse_stick:
    if i > max_height:
        max_height = i
        count += 1

print(count)
