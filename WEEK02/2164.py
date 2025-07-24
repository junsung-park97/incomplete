import sys
from collections import deque

input = sys.stdin.readline
n = int(input())

queue = deque([int(i) for i in range(1, n + 1)])

while len(queue) > 1:
   # len(queue)이 1보다 클때까지만 반복하는 것 이므로 2일떄까지 반복을 할 것이고 
    queue.popleft()
    temp = queue.popleft()
    queue.append(temp)

print(queue.popleft())
        