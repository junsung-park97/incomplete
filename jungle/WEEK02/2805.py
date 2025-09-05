# import sys

# input = sys.stdin.readline

# #n개의 tree_hei높이인 나무가 있다, 이 나무를 잘라 m만큼 가져가야하는데 이때의 h값을 구하라
# #taget = h, h를 어떻게 구할건데? 

# n, m = map(int, input().strip().split())
# tree_hei = list(map(int, input().strip().split()))


# start = 0
# end = max(tree_hei)
# result = 0

# while start <= end :
#     mid = (start + end) // 2
#     total = 0


#     for tree in tree_hei:
#         if tree > mid:
#             total += tree - mid

#     if total >= m:
#         result += mid

#     elif total < m:
        

#     else :
#         end = mid - 1

# print(max(result))


import sys
input = sys.stdin.readline

# 입력 받기
n, m = map(int, input().strip().split())
tree_hei = list(map(int, input().strip().split()))

start = 0
end = max(tree_hei)
result = 0

while start <= end:
    mid = (start + end) // 2
    total = 0

    # 잘린 나무 길이 합 구하기
    for tree in tree_hei:
        if tree > mid:
            total += tree - mid

    # 원하는 길이만큼 가져갈 수 있다면, 절단 높이를 더 올려본다
    if total >= m:
        result = mid  # 최대한 덜 자르면서도 m 이상이면 저장
        start = mid + 1
    else:
        end = mid - 1

print(result)