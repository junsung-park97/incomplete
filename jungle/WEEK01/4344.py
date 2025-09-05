# 대학생 새내기들의 90%는 자신이 반에서 평균은 넘는다고 생각한다. 당신은 그들에게 슬픈 진실을 알려줘야 한다.

# 첫째 줄에는 테스트 케이스의 개수 C가 주어진다.
# 둘째 줄부터 각 테스트 케이스마다 학생의 수 N(1 ≤ N ≤ 1000, N은 정수)이 첫 수로 주어지고, 이어서 N명의 점수가 주어진다. 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.

# 각 케이스마다 한 줄씩 평균을 넘는 학생들의 비율을 반올림하여 소수점 셋째 자리까지 출력한다. 정답과 출력값의 절대/상대 오차는 10-3이하이면 정답이다

# C = int(input())

# for _ in range(C):
#     N = int(input())
#     for i in range(N):
#         # i = list(map(int,input().split()))
#         student = list(map(int,input().split()))
#         #total_score = sum(i)
#         total_score = sum(student)
#         #total = sum / len(i)
#         total = total_score / len(student)
#         print(f"{total:.3f}")

C = int(input())

for _ in range(C):
    data = list(map(int,input().split()))
    N = data[0]
    scores = data[1:]
    average = sum(scores) / N
    # 평균을 넘는 학생들을 추출 리스트 컴프리헨션이라는 문법
    # scores리스트에서 하나씩 점수를 꺼내 score변수에 담음
    # 그 점수가 average보다 크면 리스트에 포함 그렇지 않으면 제외
    above_average = [score for score in scores if score > average]
    #평
    rate = len(above_average) / N * 100
    print(f"{rate:.3f}%")




#
