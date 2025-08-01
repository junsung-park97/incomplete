# def binary_search(array, target, start, end):
#     if start > end:
#         return None
#     mid = (start + end) // 2

#     # 원하는 값 찾은 경우 인덱스 반환
#     if array[mid] == target:
#         return mid
#     # 원하는 값이 중간점의 값보다 작은 경우 왼쪽 부분(절반의 왼쪽 부분) 확인
#     elif array[mid] > target:
#         return binary_search(array, target, start, mid - 1)
#     # 원하는 값이 중간점의 값보다 큰 경우 오른쪽 부분(절반의 오른쪽 부분) 확인
#     else:
#         return binary_search(array, target, mid + 1, end)


# n, target = list(map(int, input().split()))
# array = list(map(int, input().split()))

# result = binary_search(array, target, 0, n - 1)
# if result is None:
#     print('원소가 존재 X')
# else:
#     print(result + 1)


def binary_search(target, data):
    data.sort()
    start = 0 			# 맨 처음 위치
    end = len(data) - 1 	# 맨 마지막 위치

    while start <= end:
        mid = (start + end) // 2 # 중간값

        if data[mid] == target:
            return mid 		# target 위치 반환

        elif data[mid] > target: # target이 작으면 왼쪽을 더 탐색
            end = mid - 1
        else:                    # target이 크면 오른쪽을 더 탐색
            start = mid + 1
    return