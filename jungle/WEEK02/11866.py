import sys
from collections import deque

input = sys.stdin.readline

n, k = map(int, input().rstrip().split())

humen = deque([int(i) for i in range(1, n + 1)])

queue = []

while len(humen) > 0:
    for _ in range(k - 1):
        humen.append(humen.popleft())
    queue.append(str(humen.popleft()))

result = ", ".join(queue)
print(f'<{result}>')