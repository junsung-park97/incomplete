from collections import deque

# 입력 받기
n = int(input())
graph = [list(map(int, input())) for _ in range(n)]
visited = [[False] * n for _ in range(n)]

# 4방향 이동 (상, 하, 좌, 우)
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(start_x, start_y):
    """BFS로 연결된 집의 개수를 세는 함수"""
    queue = deque([(start_x, start_y)])
    visited[start_x][start_y] = True
    count = 1  # 시작점 포함
    
    while queue:
        x, y = queue.popleft()
        
        # 4방향 탐색
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            
            # 범위 체크 and 집이 있음 and 미방문
            if 0 <= nx < n and 0 <= ny < n and graph[nx][ny] == 1 and not visited[nx][ny]:
                visited[nx][ny] = True
                queue.append((nx, ny))
                count += 1
    
    return count

# 결과 저장
complex_sizes = []

# 전체 지도 탐색
for i in range(n):
    for j in range(n):
        # 집이 있고 미방문인 경우 새로운 단지 발견
        if graph[i][j] == 1 and not visited[i][j]:
            size = bfs(i, j)  # 단지 크기 계산
            complex_sizes.append(size)

# 결과 출력
complex_sizes.sort()  # 오름차순 정렬
print(len(complex_sizes))  # 단지 개수
for size in complex_sizes:
    print(size)  # 각 단지의 집 개수