import sys
from collections import deque

input = sys.stdin.readline

n, m = map(int, input().split())
board = [input().rstrip() for _ in range(n)]

visited = [[False] * m for _ in range(n)]


def bfs(start_x, start_y):
    #start_x, start_y를 인자로받아서 큐에 넣는다?
    queue = deque([(start_x, start_y)])
    #그렇게 큐에 들어간 좌표를 방문배열에서 true처리한다.
    visited[start_x][start_y] = True
    #입력받은 나무판자에서의 위치정보를 current_dire = 현재의 위치정보
    current_direction = board[start_x][start_y]
    
    while queue:
        x, y = queue.popleft()
        
        # 현재 판자 방향에 따라 탐색 방향 결정
        if current_direction == '-':
            # 가로 판자: 좌우만 탐색
            directions = [(0, -1), (0, 1)]
        else:  # current_direction == '|'
            # 세로 판자: 상하만 탐색
            directions = [(-1, 0), (1, 0)]
        
        #위에 if문에서 정의됨. nx, ny는 좌표값
        for dx, dy in directions:
            nx = x + dx
            ny = y + dy
            
            # 범위 체크 and 미방문 and 같은 방향 판자, board[nx][ny]는 죄표값 X, 입력값(현재값) == 현재값이 같냐?
            if 0 <= nx < n and 0 <= ny < m and not visited[nx][ny] and board[nx][ny] == current_direction:
                visited[nx][ny] = True
                queue.append((nx, ny))

cnt = 0

# 전체 방 탐색
for i in range(n):
    for j in range(m):
        if not visited[i][j]:
            bfs(i, j)  # 새로운 판자 발견
            cnt += 1

print(cnt)