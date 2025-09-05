import sys,math

input = sys.stdin.readline

w, h = map(int, input().split())
cut_case = int(input())

# cut_list = []
wid = [0, w]
hei = [0, h]

for _ in range(cut_case):
    # cut_list = list(int(input().split()))
    temp, num = map(int, input().split())
    # if cut_list[0:1] == 1 :
    if temp == 1 :
        wid.append(num)
        wid.sort()
        # print(f"{wid}가로선이 잘렸습니다")
    else :
        hei.append(num)
        hei.sort()
        # print(f"{hei}세로선이 잘렸습니다")




result = 0

for i in range(len(wid) - 1):
    for j in range(len(hei) - 1):
        #이해못했어
        X = wid[i + 1] - wid[i]
        Y = hei[j + 1] - hei[j]
        result = max(result, X * Y)

print(result)

# 갭차이를 구해서 그 차이가 가장 큰 값을 x,y축 각각 구하면 가장 갭이 큰값이 나오게되겠네


