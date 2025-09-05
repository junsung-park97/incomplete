def div(y, x, n): 
    color = paper[y][x] # 색종이의 색
    for i in range(y, y+n): # y 분할 
        for j in range(x, x+n): # x 분할
            if color != paper[i][j]: # 찾는 과정에서 색이 달라지면
                m = n//2
                div(y, x, m) # 색종이 분할 (2사분면)
                div(y, x + m, m) # 색종이 분할 (1사분면)
                div(y + m, x, m) # 색종이 분할 (3사분면)
                div(y + m, x + m, m) # 색종이 분할(4사분면)
                return
    if color == 0: # 흰색이면
        result[0] += 1 #자르기
    else : # 파란색이면
        result[1] += 1 # 갯수세기
        
import sys
N = int(sys.stdin.readline())
paper = [list(map(int, sys.stdin.readline().split())) for _ in range(N)] # 색종이
result = [0,0] # 자른 색종이 / 파란색 색종이
div(0,0,N)
print(result[0],'\n',result[1],sep='')