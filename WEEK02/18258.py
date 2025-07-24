import sys
from collections import deque

input = sys.stdin.readline

n = int(input())
queue = deque([])


for _ in range(n):
    data = list(input().rstrip().split())

    if data[0] == 'push':
        queue.append(data[1])
    elif data[0] == 'pop':
        if len(queue) != 0:
            print(queue.popleft())
        else :
            print('-1')
    elif data[0] == 'size':
        print(len(queue))
    elif data[0] == 'empty':
        if len(queue) == 0:
            print('1')
        else :
            print('0')
    elif data[0] == 'front':
        if len(queue) != 0:
            print(queue[0])
        else :
            print('-1')
    else:
        if len(queue) != 0:
            print(queue[-1])
        else :
            print('-1')
