from collections import deque

# 입력 받기
n, k = map(int, input().split())
graph = []
viruses = []

# 시험관 정보 입력 및 바이러스 위치 저장
for i in range(n):
    row = list(map(int, input().split()))
    graph.append(row)
    for j in range(n):
        if row[j] != 0:  # 바이러스가 있는 경우
            viruses.append((row[j], i, j))  # (바이러스 번호, 행, 열)

s, x, y = map(int, input().split())

# 바이러스를 번호 순으로 정렬 (낮은 번호부터 전염)
viruses.sort()

# BFS를 위한 큐 초기화
queue = deque()
for virus_num, i, j in viruses:
    queue.append((virus_num, i, j, 0))  # (바이러스 번호, 행, 열, 시간)

# 4방향 이동 (상, 하, 좌, 우)
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

# BFS 수행
while queue:
    virus_num, x_pos, y_pos, time = queue.popleft()
    
    # s초가 지나면 종료
    if time == s:
        break
    
    # 4방향으로 전염 시도
    for i in range(4):
        nx = x_pos + dx[i]
        ny = y_pos + dy[i]
        
        # 범위 체크 및 빈 칸인지 확인
        if 0 <= nx < n and 0 <= ny < n and graph[nx][ny] == 0:
            graph[nx][ny] = virus_num  # 바이러스 전염
            queue.append((virus_num, nx, ny, time + 1))

# 결과 출력 (좌표는 1-based이므로 1을 빼줌)
print(graph[x-1][y-1])