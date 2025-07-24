# 분할정복

arr = [1, 5, 3, 9, 7, 23, 11]
#분할로직실행함수
def divide():
    if len(arr) == 1:
        return arr
    else:
        mid = len(arr) // 2
        arr1 = arr[:mid]
        arr2 = arr[mid:]
        print (arr1)
        print (arr2)
        return arr(arr1, arr2)
#병합로직실행함수
def merge(arr1, arr2):
    sorted_arr = []
    return