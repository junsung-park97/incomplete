def sum (N):
    for i in range(9):
        i + ()

def sum (n) ;
    return sum(i for i in range(10))

def recur (n):

    if n == 0 :
        return
    return n + recur(n-1)
    
    # tail 재귀함수
    # 재귀라해서 전부 되돌아오는것은 아니다
    # for문을 지원하는 언어에서는 tail 쟈귀를 추천하지않는다


# def exp (n):
#     total = 0
#     if n == 0:
#         return
#     for i in range():
        

def fast_exp(b, n):
    if n == 0:
        return 1
    if n % b == 0:
        fast_exp((b ** (n -2)) ** n)
    else :
        fast_exp(b * b ** (n - 1))