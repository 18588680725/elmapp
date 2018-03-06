<template>
  <div class="body">
    <div class="greenBg">
      <p class="leftExesNum" v-if='count === sumNum'>答题完成，提交查看答案吧 !</p>
      <p class="leftExesNum" v-else>剩余{{ sumNum - count }}题,加油 !</p>
      <div class="progress">
        <img src="./zbl_pen.png" class="penIcon">
        <mt-progress :value="progressNum" :bar-height="8"></mt-progress>
      </div>
      <p class="countNum">第{{ count }}题/共{{ sumNum }}题</p>
    </div>
    <div class="questions" v-for='item in resultArr' v-show='count == (item.wtxh-66)'>
      <p class="exeTitle">({{item.wtxh-66}}) {{item.title}}</p>
      <mt-radio :options="item.optionItem" @click.native='selectAns($event,item,count)'>
      </mt-radio>
    </div>
    <div class="btn-group">
      <mt-button @click.native="prev">上一题</mt-button>
      <mt-button class='commit' @click.native="calculateResult" v-if='count === sumNum'>提交</mt-button>
      <mt-button @click.native="next" v-else>下一题</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const TYPE_YANG=2;//阳虚质
  const TYPE_YIN=3;//阴虚质
  const TYPE_QI_XU=4;//气虚质
  const TYPE_TAN=5;//痰湿质
  const TYPE_SHI=6;//湿热质
  const TYPE_XUE=7;//血瘀质
  const TYPE_TE=8;//特禀质
  const TYPE_QI_YU=9;//气郁质
  const TYPE_HE=10;//平和质
  import {
    Indicator,
    Progress,
    Radio,
    MessageBox,
    Toast
  } from 'mint-ui';
  export default {
    data: function() {
      return {
        questionsArr:[
          {
            "fxbz": 0,
            "hismc": "energyFull_1",
            "type":"10",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 331,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 332,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 333,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 334,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 335,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 1,
            "wtlx": 1,
            "wtmc": "您精力充沛吗？（指精神头足，乐于做事）",
            "wtxh": 67,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "easyWeary_2",
            "type":"4,10",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 336,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 337,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 338,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 339,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 340,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 2,
            "wtlx": 1,
            "wtmc": "您容易疲乏吗？（指体力如何，是否稍微活动一下或做一点家务劳动就感到累）",
            "wtxh": 68,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "easyPant_3",
            "type":"4",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 341,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 342,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 343,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 344,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 345,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 3,
            "wtlx": 1,
            "wtmc": "您容易气短，呼吸短促，接不上气吗？",
            "wtxh": 69,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "voiceWeak_4",
            "type":"4,10",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 346,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 347,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 348,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 349,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 350,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 4,
            "wtlx": 1,
            "wtmc": "您说话声音低弱无力吗?（指说话没有力气）",
            "wtxh": 70,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "moodiness_5",
            "type":"9,10",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 351,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 352,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 353,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 354,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 355,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 5,
            "wtlx": 1,
            "wtmc": "您感到闷闷不乐、情绪低沉吗?（指心情不愉快，情绪低落）",
            "wtxh": 71,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "nervous_6",
            "type":"9",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 356,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 357,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 358,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 359,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 360,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 6,
            "wtlx": 1,
            "wtmc": "您容易精神紧张、焦虑不安吗?（指遇事是否心情紧张）",
            "wtxh": 72,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "loneliness_7",
            "type":"9",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 361,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 362,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 363,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 364,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 365,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 7,
            "wtlx": 1,
            "wtmc": "您因为生活状态改变而感到孤独、失落吗？",
            "wtxh": 73,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "easyScare_8",
            "type":"9",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 366,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 367,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 368,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 369,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 370,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 8,
            "wtlx": 1,
            "wtmc": "您容易感到害怕或受到惊吓吗?",
            "wtxh": 74,
            "xbxz": 0
          },
           {
            "fxbz": 0,
            "hismc": "overweight_9",
            "type":"5",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 371,
                "optionNr": "(BMI＜24)",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 372,
                "optionNr": "(24≤BMI＜25)",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 373,
                "optionNr": "(25≤BMI＜26)",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 374,
                "optionNr": "（26≤BMI＜28）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 375,
                "optionNr": "(BMI≥28)",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 9,
            "wtlx": 1,
            "wtmc": "您感到身体超重不轻松吗?(感觉身体沉重)[BMI 指数=体重（kg） /身高 2（m） ]",
            "wtxh": 75,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "eyeDry_10",
            "type":"3",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 376,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 377,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 378,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 379,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 380,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 10,
            "wtlx": 1,
            "wtmc": "您眼睛干涩吗?",
            "wtxh": 76,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "footFearCold_11",
            "type":"2",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 381,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 382,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 383,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 384,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 385,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 11,
            "wtlx": 1,
            "wtmc": "您手脚发凉吗?（不包含因周围温度低或穿的少导致的手脚发冷）",
            "wtxh": 77,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "backFearCold_12",
            "type":"2",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 386,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 387,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 388,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 389,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 390,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 12,
            "wtlx": 1,
            "wtmc": "您胃脘部、背部或腰膝部怕冷吗？（指上腹部、背部、腰部或膝关节等，有一处或多处怕冷）",
            "wtxh": 78,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "fearCold_13",
            "type":"2,10",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 391,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 392,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 393,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 394,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 395,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 13,
            "wtlx": 1,
            "wtmc": "您比一般人耐受不了寒冷吗？（指比别人容易害怕冬天或是夏天的冷空调、电扇等）",
            "wtxh": 79,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "cold_14",
            "type":"4",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 396,
                "optionNr": "一年＜2 次",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 397,
                "optionNr": "一年感冒 2-4 次",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 398,
                "optionNr": "一年感冒5-6 次",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 399,
                "optionNr": "一年 8 次以上",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 400,
                "optionNr": "几乎每月",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 14,
            "wtlx": 1,
            "wtmc": "您容易患感冒吗?（指每年感冒的次数）",
            "wtxh": 80,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "rhinobyon_15",
            "type":"8",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 401,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 402,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 403,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 404,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 405,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 15,
            "wtlx": 1,
            "wtmc": "您没有感冒时也会鼻塞、流鼻涕吗?",
            "wtxh": 81,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "mouthGreasy_16",
            "type":"5",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 406,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 407,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 408,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 409,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 410,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 16,
            "wtlx": 1,
            "wtmc": "您有口粘口腻，或睡眠打鼾吗？",
            "wtxh": 82,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "allergy_17",
            "type":"8",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 411,
                "optionNr": "从来没有",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 412,
                "optionNr": "一年 1、 2 次",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 413,
                "optionNr": "一年 3、 4 次",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 414,
                "optionNr": "一年 5、 6 次",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 415,
                "optionNr": "每次遇到上述原因都过敏",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 17,
            "wtlx": 1,
            "wtmc": "您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗?",
            "wtxh": 83,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "skinUrticaria_18",
            "type":"8",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 416,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 417,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 418,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 419,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 420,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 18,
            "wtlx": 1,
            "wtmc": "您的皮肤容易起荨麻疹吗? (包括风团、风疹块、风疙瘩)",
            "wtxh": 84,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "skinBleeding_19",
            "type":"7",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 421,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 422,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 423,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 424,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 425,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 19,
            "wtlx": 1,
            "wtmc": "您的皮肤在不知不觉中会出现青紫瘀斑、皮下出血吗?（指皮肤在没有外伤的情况下出现青一块紫一块的情况）",
            "wtxh": 85,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "skinRed_20",
            "type":"8",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 426,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 427,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 428,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 429,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 430,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 20,
            "wtlx": 1,
            "wtmc": "您的皮肤一抓就红，并出现抓痕吗?（指被指甲或钝物划过后皮肤的反应）",
            "wtxh": 86,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "skinDry_21",
            "type":"3",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 431,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 432,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 433,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 434,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 435,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 21,
            "wtlx": 1,
            "wtmc": "您皮肤或口唇干吗?",
            "wtxh": 87,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "limbsNumb_22",
            "type":"7",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 436,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 437,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 438,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 439,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 440,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 22,
            "wtlx": 1,
            "wtmc": "您有肢体麻木或固定部位疼痛的感觉吗？",
            "wtxh": 88,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "faceGreasy_23",
            "type":"6",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 441,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 442,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 443,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 444,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 445,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 23,
            "wtlx": 1,
            "wtmc": "您面部或鼻部有油腻感或者油亮发光吗?（指脸上或鼻子）",
            "wtxh": 89,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "faceDim_24",
            "type":"7",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 446,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 447,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 448,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 449,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 450,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 24,
            "wtlx": 1,
            "wtmc": "您面色或目眶晦黯，或出现褐色斑块/斑点吗?",
            "wtxh": 90,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "skinEczema_25",
            "type":"6",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 451,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 452,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 453,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 454,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 455,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 25,
            "wtlx": 1,
            "wtmc": "您有皮肤湿疹、疮疖吗？",
            "wtxh": 91,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "mouthDry_26",
            "type":"3",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 456,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 457,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 458,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 459,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 460,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 26,
            "wtlx": 1,
            "wtmc": "您感到口干咽燥、总想喝水吗？",
            "wtxh": 92,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "bitterTaste_27",
            "type":"6",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 461,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 462,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 463,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 464,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 465,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 27,
            "wtlx": 1,
            "wtmc": "您感到口苦或嘴里有异味吗?（指口苦或口臭）",
            "wtxh": 93,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "bellyLarge_28",
            "type":"5",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 466,
                "optionNr": "(腹围<80cm,相当于2.4尺)",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 467,
                "optionNr": "(腹围 80-85cm,2.4-2.55尺)",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 468,
                "optionNr": "(腹围 86-90cm,2.56-2.7尺)",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 469,
                "optionNr": "(腹围 1-105cm,2.71-3.15尺)",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 470,
                "optionNr": "(腹围>105cm或3.15尺)",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 28,
            "wtlx": 1,
            "wtmc": "您腹部肥大吗?（指腹部脂肪肥厚）",
            "wtxh": 94,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "fearCool_29",
            "type":"2",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 471,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 472,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 473,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 474,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 475,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 29,
            "wtlx": 1,
            "wtmc": "您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？（指不喜欢吃凉的食物，或吃了凉的食物后会不舒服）",
            "wtxh": 95,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "stoolStiction_30",
            "type":"6",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 476,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 477,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 478,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 479,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 480,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 30,
            "wtlx": 1,
            "wtmc": "您有大便黏滞不爽、解不尽的感觉吗?(大便容易粘在马桶或便坑壁上)",
            "wtxh": 96,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "stoolDry_31",
            "type":"3",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 481,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 482,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 483,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 484,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 485,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 31,
            "wtlx": 1,
            "wtmc": "您容易大便干燥吗?",
            "wtxh": 97,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "furStodgily_32",
            "type":"5",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 486,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 487,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 488,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 489,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 490,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 32,
            "wtlx": 1,
            "wtmc": "您舌苔厚腻或有舌苔厚厚的感觉吗?（如果自我感觉不清楚可由调查员观察后填写）",
            "wtxh": 98,
            "xbxz": 0
          },
          {
            "fxbz": 0,
            "hismc": "stasisPurple_33",
            "type":"7",
            "options": [
              {
                "inverseScore": 5.0,
                "optionId": 491,
                "optionNr": "没有（根本不/从来没有）",
                "optionOrder": 1,
                "score": 1.0
              },
              {
                "inverseScore": 4.0,
                "optionId": 492,
                "optionNr": "很少（有一点/偶尔）",
                "optionOrder": 2,
                "score": 2.0
              },
              {
                "inverseScore": 3.0,
                "optionId": 493,
                "optionNr": "有时（有些/少数时间）",
                "optionOrder": 3,
                "score": 3.0
              },
              {
                "inverseScore": 2.0,
                "optionId": 494,
                "optionNr": "经常（相当/多数时间）",
                "optionOrder": 4,
                "score": 4.0
              },
              {
                "inverseScore": 1.0,
                "optionId": 495,
                "optionNr": "总是（非常/每天）",
                "optionOrder": 5,
                "score": 5.0
              }
            ],
            "plsx": 33,
            "wtlx": 1,
            "wtmc": "您舌下静脉瘀紫或增粗吗？（可由调查员辅助观察后填写）",
            "wtxh": 99,
            "xbxz": 0
          }
        ],
        progressNum: 1,
        count: 1,
        sumNum: 30,
        resultArr: [],
        resultObj: {},
        selectResult:[]
      }
    },
    methods: {
      selectAns(e, item,count) {
        if (e.target.classList.contains('mint-radio-input')) {
//          console.log(item.type)
//          this.resultObj[item.wtxh + ''] = parseInt(e.target.value)
          let obj={}
          obj.type=item.type;
          obj.wtxh=item.wtxh;
          for(let i=0;i<this.resultArr.length;i++){
            for(let a=0;a<this.resultArr[i].optionItem.length;a++){
              if (parseInt(e.target.value)==parseInt(this.resultArr[i].optionItem[a].value))
              {
                obj.score=parseInt(this.resultArr[i].optionItem[a].score);
              }
            }
          }
          this.selectResult[count-1]=obj;
          console.log(this.selectResult)
          let timer
          if (timer) {
            clearTimeout(timer)
          }
          if (this.count < this.sumNum) {
            let that = this
            timer = setTimeout(function() {
              that.count++
              that.progressNum = 100 / that.sumNum * that.count
              that.penMove()
              // let textSpan = e.target.parentNode.nextSibling.nextSibling
              // textSpan.classList.add('selected')
            }, 100)
          } else {
            MessageBox('提示', '您已全部答完，请点击提交')
          }
        } else {}
      },
      prev() {
        if (this.count > 1) {
          this.count--
          this.progressNum = 100 / this.sumNum * this.count
          this.penMove()
        }
      },
      next() {
        if (this.count < this.sumNum) {
          if (this.resultObj[parseInt(this.count) + 66]) {
            this.count++
            this.progressNum = 100 / this.sumNum * this.count
            this.penMove()
          } else {
            Toast({
              message: '请选择答案',
              duration: 1000
            })
          }
        } else {
          MessageBox('提示', '您已全部答完，请点击提交!')
        }
      },
      penMove() {
        let move = window.innerWidth * 0.7 / this.sumNum * this.count + 'px'
        document.querySelector('.progress > .penIcon').style.marginLeft = `calc(-0.6rem + ${move})`
      },
      //计算结果
      calculateResult(){
//        for(let a=0;a<=9;a++){
          let num=0;
          let totalScore=0;
          for(let i=0;i<this.selectResult.length;i++){
//            console.log(this.selectResult[i].type)
            if(this.selectResult[i].type.indexOf(TYPE_YANG)>=0){
                num+=1;
              console.log(num)
              totalScore=this.selectResult[i].score
            }
          }
          totalScore=(totalScore-num)/(num*4)*100;
            console.log(totalScore)

//          }
      }
    },
    mounted(){
      this.sumNum=this.questionsArr.length
      this.questionsArr.forEach(item => {
        let obj = {}
        let tempArr = []
        obj.title = item.wtmc
        obj.wtxh = item.wtxh
        obj.type=item.type
        item.options.forEach(item2 => {
          let obj2 = {}
          obj2.label = item2.optionNr
          obj2.value = item2.optionId + ''
          obj2.score=item2.score
          tempArr.push(obj2)
        })
        obj.optionItem = tempArr
        this.resultArr.push(obj)
      })
      console.log(this.resultArr)
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .body
    position :absolute
    top:0
    width :100%
    background :white
    .greenBg
      height :140px
      width :100%
      background: url('./zbl_bg.png') no-repeat;
      background-size :100%
      padding-top:10px
      .leftExesNum
        text-align :center
        color :yellow
      .progress
        width :70%
        margin :0 20px;
        .penIcon
          width :40px
          height :40px
          margin-right :10px
        .mt-progress
          width :100%
          margin-left 20px
      .countNum
        text-align :center
        color :white
    .questions
      margin:10px 10px
    .btn-group
      text-align center
      .mint-button
        display: block;
        width: 80%;
        margin: 20px auto;
        background-color: #fff;
        color: green;
        border: 1px solid green;
        font-size: .3rem;

      .commit
        background-color: #42ba6f;
        color: #fff;

</style>
