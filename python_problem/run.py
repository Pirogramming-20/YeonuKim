class Student:
    A_cut = 90
    B_cut = 80
    C_cut = 70

    def __init__(self, name, midScore, finalScore):
        self.__name = name
        self.__midScore = midScore
        self.__finalScore = finalScore
        self.__grade = ""    
    def getName(self):
        return self.__name    
    def getMidScore(self):
        return self.__midScore    
    def getFinalScore(self):
        return self.__finalScore    
    def getGrade(self):
        return self.__grade    
    def isGrade(self):
        if(self.__grade == ""):
            return False
        else:
            return True    
    def calcGrade(self):
        averageScore = (self.__midScore + self.__finalScore) /2
        if (averageScore >= self.A_cut):
            self.__grade = 'A'
        elif (averageScore >= self.B_cut):
            self.__grade = 'B'
        elif (averageScore >= self.C_cut):
            self.__grade = 'C'
        else:
            self.__grade = 'D'

    # Add function that can change grade cut using classmethod
    @classmethod
    def changeGradeCut(cls, A_cut, B_cut, C_cut):
        cls.A_cut = A_cut
        cls.B_cut = B_cut
        cls.C_cut = C_cut

class StudentList:
    def __init__(self):
        self.__students = []

    def isEmpty(self):
        return not self.__students  
      
    def getStudentList(self):
        return self.__students   
     
    def insertStudent(self, name, midScore, finalScore) :
        newStudent = Student(name, midScore, finalScore)
        self.__students.append(newStudent)

    def grading(self):
        for student in self.__students:
            student.calcGrade()

    def printStudents(self):
        print("---------------------------------------")
        print(f"{'name':10} {'mid':10} {'final':10} {'grade':10}")
        for student in self.__students:
            print(f"{student.getName():10} {str(student.getMidScore()):10} {str(student.getFinalScore()):10} {student.getGrade():10}")

    def deleteStudent(self, name):
        for student in self.__students:
            if(student.getName() == name):
                self.__students.remove(student)

def invalidScore(score):
    for scoreChar in score:
        if(scoreChar != '0'
           and scoreChar != '1'
           and scoreChar != '2'
           and scoreChar != '3'
           and scoreChar != '4'
           and scoreChar != '5'
           and scoreChar != '6'
           and scoreChar != '7'
           and scoreChar != '8'
           and scoreChar != '9'):
            return True
    return False

students = StudentList()
print("*Menu*******************************")
print("1. Inserting students Info(name score1 score2)")
print("2. Grading")
print("3. Printing students Info")
print("4. Deleting students Info")
print("5. Exit program")
print("*************************************")
while True :
    choice = input("Choose menu 1, 2, 3, 4, 5, 6 : ")
    if choice == "1":
        userinput = input("Enter name mid-score final-score: ").split()
        if(len(userinput) != 3):
            print("Num of data is not 3!")
            continue
        if(invalidScore(userinput[1]) or invalidScore(userinput[2])):
            print("Score is not positive integer!")
            continue
        name = userinput[0]
        midScore = int(userinput[1])
        finalScore = int(userinput[2])
        doubleFlag = False
        for student in students.getStudentList():
            if(student.getName() == name):
                print("Already exist name!")
                doubleFlag = True
        if(not doubleFlag):
            students.insertStudent(name, midScore, finalScore)

    elif choice == "2" :
        if(students.isEmpty()):
            print("No student data!")
            continue
        students.grading()
        print("Grading to all students.")

    elif choice == "3" :
        isGradeFlag = False
        if(students.isEmpty()):
            print("No student data!")
            continue
        for student in students.getStudentList():
            if(not student.isGrade()):
                print("There is a student who didn't get grade.")
                isGradeFlag = True
                break               
        if(not isGradeFlag):
            students.printStudents()

    elif choice == "4" :
        targetName = input("Enter the name to delete: ")
        existStudentFlag = False
        if(students.isEmpty()):
            print("No student data!")
            continue
        for student in students.getStudentList():
            if(student.getName() == targetName):
                existStudentFlag = True
                students.deleteStudent(targetName)
        if(not existStudentFlag):
            print("Not exist name!")
        pass

    elif choice == "5" :
        print("Exit Program!")
        break

    # Additinal function: change the score cut of grade
    elif choice == "6" :
        userinput = input("Enter the score cut of A, B, and C: ").split()
        print(len(userinput))
        if(len(userinput) != 3):
            print("Num of data is not 3!")
            continue
        if(invalidScore(userinput[0]) or invalidScore(userinput[1]) or invalidScore(userinput[2])):
            print("Score is not positive integer!")
            continue
        A_cut, B_cut, C_cut = map(int, userinput)
        if (A_cut < B_cut or B_cut < C_cut):
            print("Score cut is invalid.")
            continue
        Student.changeGradeCut(A_cut, B_cut, C_cut)

    else :
        print("Wrong number. Choose again.")