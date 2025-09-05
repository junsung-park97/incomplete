import sys

input = sys.stdin.readline

n = int(input())

stack = []

for _ in range(n):
    commend = input().rstrip().split()
    if commend[0] == 'push':
        stack.append(commend[1])
    elif commend[0] == 'pop':
        if not stack:
            print('-1')
        else:
            print(stack.pop())
    elif commend[0] == 'size':
        print(len(stack))
    elif commend[0] == 'empty':
        if not stack:
            print('1')
        else :
            print('0')
    elif commend[0] == 'top':
        if not stack :
            print('-1')
        else :
            print(stack[-1])

# 