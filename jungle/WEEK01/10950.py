# 두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

#첫째 줄에 테스트 케이스의 개수 T가 주어진다.
#각 테스트 케이스는 한 줄로 이루어져 있으며, 각 줄에 A와 B가 주어진다. (0 < A, B < 10)

#각 테스트 케이스마다 A+B를 출력한다.
import sys

input = sys.stdin.readline

T = int(input())

for _ in range(T):
    a,b = map(int,input().split())
    sum = a + b
    print(sum)
    
    


# 테스트 케이스의 개수 T 라는 말이 인풋의 개수말하는건가? => 맞음
# T에 값을 입력받으면 T만큼 반복하면서 입력창을 만들고
# 만들어진 입력창만큼 A, 