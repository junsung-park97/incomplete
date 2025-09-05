# 문자열 S를 입력받은 후에, 각 문자를 R번 반복해 새 문자열 P를 만든 후 출력하는 프로그램을 작성하시오. 즉, 첫 번째 문자를 R번 반복하고, 
# 두 번째 문자를 R번 반복하는 식으로 P를 만들면 된다. S에는 QR Code "alphanumeric" 문자만 들어있다.
# QR Code "alphanumeric" 문자는 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\$%*+-./: 이다.

# 첫째 줄에 테스트 케이스의 개수 T(1 ≤ T ≤ 1,000)가 주어진다. 각 테스트 케이스는 반복 횟수 R(1 ≤ R ≤ 8), 문자열 S가 공백으로 구분되어 주어진다. S의 길이는 적어도 1이며, 20글자를 넘지 않는다. 

# 각 테스트 케이스에 대해 P를 출력한다.

# 테스트케이스 T가 주어지면
# T별로 문자열 S를 입력받고
# 문자열 S내의 문자를 R번 반복한
# P문자열을 만든다

import sys

input = sys.stdin.readline

T = int(input())

for _ in range(T) :
    R, S = map(str,input().strip().split())
    result = ""
    for ch in S:
        # R은 위에서 str으로 받아왔기때문에 형변환을 해야함.
        result += ch * int(R)
    print(result)

        


        

