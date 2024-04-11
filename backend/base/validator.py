from datetime import date

def validate_coupon(code,user):

    if code == "ITSYOURBIRTHDAY":
        if (user.dob.month,user.dob.day) == (date.today().month,date.today().day)  :
            return "success",True
        else:
            return "Today is not your's Birthday",False
    elif code == "FREEDELIVERY":
        return "success",True
    else:
        return "Invalid Coupon",False