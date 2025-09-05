import sys, math

n = int(sys.stdin.readline().strip())

def hansu(n):
    if n <= 99:
        return n
    count = 99
    for i in range(100, n + 1):
        a = i // 100
        b = (i // 10) % 10
        c = i % 10
        if (b - a) == (c - b):
            count += 1
        # return n
    return count

print(hansu(n))

