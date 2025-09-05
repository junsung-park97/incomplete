# 한수는 지금 (x, y)에 있다. 직사각형은 각 변이 좌표축에 평행하고, 왼쪽 아래 꼭짓점은 (0, 0), 오른쪽 위 꼭짓점은 (w, h)에 있다. 
# 직사각형의 경계선까지 가는 거리의 최솟값을 구하는 프로그램을 작성하시오.

x,y,w,h = map(int,input().split())

# 각 변까지의 거리
to_left = x
to_button = y
to_right = w - x
to_top = h - y

# 변까지의 거리를 구한 각각의 값을 리스트에 담는다
distances = [to_left, to_button, to_right, to_top]

# 그 값중에 최소값을 출력한다
print(min(distances))

# (0, 0)부터 (w, h)까지의 직사각형안에 한수가(x, y)에 존재하는데 직사각형의 경계까지의 최소거리를 구하는 문제
# 한수의 좌표로부터 각 변의 거리를 구한 후 그 값중에 최소값을 구한다