#함수 이름은 변경 가능합니다.

##############  menu 1
def insertStudent(name, midScore, finalScore) :
    #사전에 학생 정보 저장하는 코딩
    newStudent = Student(name, midScore, finalScore)
    studentList.append(newStudent)

##############  menu 2
def grading(studentList) :
    #학점 부여 하는 코딩
    for student in studentList:
        student.calcGrade()
    pass

##############  menu 3
def printStudent() :
    #출력 코딩
    pass

##############  menu 4
def deleteStudent():
    #학생 정보 삭제하는 코딩
    pass

class Student:
    def __init__(self, name, midScore, finalScore):
        self.__name = name
        self.__midScore = midScore
        self.__finalScore = finalScore
        self.__grade = ""
    
    def getName(self):
        return self.__name
    
    def getGrade(self):
        return self.__grade
    
    def isGrade(self):
        if(self.__grade == ""):
            return False
        else:
            return True
    
    def calcGrade(self):
        averageScore = (self.__midScore + self.__finalScore) /2
        if (averageScore >= 90):
            self.__grade = 'A'
        elif (averageScore >= 80):
            self.__grade = 'B'
        elif (averageScore >= 70):
            self.__grade = 'C'
        else:
            self.__grade = 'D'

        
    
#학생 정보를 저장할 변수 초기화
studentList = []
print("*Menu*******************************")
print("1. Inserting students Info(name score1 score2)")
print("2. Grading")
print("3. Printing students Info")
print("4. Deleting students Info")
print("5. Exit program")
print("*************************************")
while True :
    choice = input("Choose menu 1, 2, 3, 4, 5 : ")
    if choice == "1":
        #학생 정보 입력받기
        #예외사항 처리(데이터 입력 갯수, 이미 존재하는 이름, 입력 점수 값이 양의 정수인지)
        #예외사항이 아닌 입력인 경우 1번 함수 호출
        userinput = input("Enter name mid-score final-score: ").split()
        if(len(userinput) != 3):
            print("Num of data is not 3!")
        elif(userinput[1].find('-') != -1 or userinput[1].find('.') != -1 or userinput[2].find('-') != -1 or userinput[2].find('.') !=-1):
            print("Score is not positive integer!")
        else:
            name = userinput[0]
            midScore = int(userinput[1])
            finalScore = int(userinput[2])
            doubleFlag = False
            if (len(studentList) == 0):
                insertStudent(name, midScore, finalScore)
            else:
                for student in studentList:
                    if(student.getName() == name):
                        print("Already exist name!")
                        doubleFlag = True
                if(not doubleFlag):
                    insertStudent(name, midScore, finalScore)

    elif choice == "2" :
        #예외사항 처리(저장된 학생 정보의 유무)
        #예외사항이 아닌 경우 2번 함수 호출
        #"Grading to all students." 출력
        if(len(studentList)==0):
            print("No student data!")
        else:
            grading(studentList)
            print("Grading to all students.")
        pass

    elif choice == "3" :
        #예외사항 처리(저장된 학생 정보의 유무, 저장되어 있는 학생들의 학점이 모두 부여되어 있는지)
        #예외사항이 아닌 경우 3번 함수 호출
        pass

    elif choice == "4" :
        #예외사항 처리(저장된 학생 정보의 유무)
        #예외사항이 아닌 경우, 삭제할 학생 이름 입력 받기
        #입력 받은 학생의 존재 유무 체크 후, 없으면 "Not exist name!" 출력
        #있으면(예를 들어 kim 이라 하면), 4번 함수 호출 후에 "kim student information is deleted." 출력
        pass

    elif choice == "5" :
        #프로그램 종료 메세지 출력
        #반복문 종료
        print("Exit Program!")
        break
        pass

    else :
        #"Wrong number. Choose again." 출력
        print("Wrong number. Choose again.")
        pass