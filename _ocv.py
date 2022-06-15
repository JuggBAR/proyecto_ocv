import pyautogui as pag
import cv2 as cv
from PIL import ImageGrab
from numpy import array, uint8, ascontiguousarray, where


class _Templates:
    CHROME = cv.imread('./imgs/_chrome.png')
    ELLIPSE = cv.imread('./imgs/ellipse.png')
    TEST = cv.imread('./imgs/eltest.png')
    # RECT = cv.imread('./imgs/rect.png')


def grab_frame_max_loc(temp: array, method: int = cv.TM_CCOEFF_NORMED, get_max: bool = False):
    img = ImageGrab.grab()
    img_arr = cv.cvtColor(ascontiguousarray(img, dtype=uint8), cv.COLOR_RGB2BGR)
    res = cv.matchTemplate(img_arr, temp, method)
    if get_max:
        _,maxp,_,max = cv.minMaxLoc(res)
        return maxp, max
    data = zip(*(where(res > 0.96)[::-1]))
    # for i in zip(*(where(res > 0.6)[::-1])):
    #     cv.rectangle(img_arr, i, (i[0]+32, i[1]+32), (0,255,0), 2)
    return data


_, img = grab_frame_max_loc(_Templates.CHROME, get_max=True)
pag.click(img[1]-60, img[0] + 130)
pag.keyDown('f11')
# img = _Templates.TEST
# _,_,_,max = cv.minMaxLoc(cv.matchTemplate(img, _Templates.ELLIPSE, cv.TM_CCORR_NORMED))
# n = cv.rectangle(img, max, (max[0]+_Templates.ELLIPSE.shape[0], max[1]++_Templates.ELLIPSE.shape[1]), (255, 0, 0), 2)
while True:
    p,i = grab_frame_max_loc(_Templates.ELLIPSE, cv.TM_CCORR_NORMED, get_max=True)
    if p > 0.98:
        x, y = i
        x += 10
        y += 10
        pag.click(x, y)
    if cv.waitKey(1) == 32:
        cv.destroyAllWindows()
        break
