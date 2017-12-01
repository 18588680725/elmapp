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
      <mt-radio :options="item.optionItem" @click.native='selectAns($event,item)'>
      </mt-radio>
    </div>
    <div class="btn-group">
      <mt-button @click.native="prev">上一题</mt-button>
      <mt-button class='commit' @click.native="commit" v-if='count === sumNum'>提交</mt-button>
      <mt-button @click.native="next" v-else>下一题</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
        questionsArr:[{"wtxh":67,"wtmc":"您精力充沛吗？（指精神头足，乐于做事）","wtlx":1,"plsx":1,"xbxz":0,"fxbz":0,"hismc":"energyFull_1","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":331,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":332,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":333,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":334,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":335,"score":5.0,"inverseScore":1.0}]},{"wtxh":68,"wtmc":"您容易疲乏吗？（指体力如何，是否稍微活动一下或做一点家务劳动就感到累）","wtlx":1,"plsx":2,"xbxz":0,"fxbz":0,"hismc":"easyWeary_2","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":336,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":337,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":338,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":339,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":340,"score":5.0,"inverseScore":1.0}]},{"wtxh":69,"wtmc":"您容易气短，呼吸短促，接不上气吗？","wtlx":1,"plsx":3,"xbxz":0,"fxbz":0,"hismc":"easyPant_3","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":341,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":342,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":343,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":344,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":345,"score":5.0,"inverseScore":1.0}]},{"wtxh":70,"wtmc":"您说话声音低弱无力吗?（指说话没有力气）","wtlx":1,"plsx":4,"xbxz":0,"fxbz":0,"hismc":"voiceWeak_4","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":346,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":347,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":348,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":349,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":350,"score":5.0,"inverseScore":1.0}]},{"wtxh":71,"wtmc":"您感到闷闷不乐、情绪低沉吗?（指心情不愉快，情绪低落）","wtlx":1,"plsx":5,"xbxz":0,"fxbz":0,"hismc":"moodiness_5","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":351,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":352,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":353,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":354,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":355,"score":5.0,"inverseScore":1.0}]},{"wtxh":72,"wtmc":"您容易精神紧张、焦虑不安吗?（指遇事是否心情紧张）","wtlx":1,"plsx":6,"xbxz":0,"fxbz":0,"hismc":"nervous_6","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":356,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":357,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":358,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":359,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":360,"score":5.0,"inverseScore":1.0}]},{"wtxh":73,"wtmc":"您因为生活状态改变而感到孤独、失落吗？","wtlx":1,"plsx":7,"xbxz":0,"fxbz":0,"hismc":"loneliness_7","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":361,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":362,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":363,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":364,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":365,"score":5.0,"inverseScore":1.0}]},{"wtxh":74,"wtmc":"您容易感到害怕或受到惊吓吗?","wtlx":1,"plsx":8,"xbxz":0,"fxbz":0,"hismc":"easyScare_8","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":366,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":367,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":368,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":369,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":370,"score":5.0,"inverseScore":1.0}]},{"wtxh":75,"wtmc":"您感到身体超重不轻松吗?(感觉身体沉重)[BMI 指数=体重（kg） /身高 2（m） ]","wtlx":1,"plsx":9,"xbxz":0,"fxbz":0,"hismc":"overweight_9","options":[{"optionNr":"(BMI＜24)","optionOrder":1,"optionId":371,"score":1.0,"inverseScore":5.0},{"optionNr":"(24≤BMI＜25)","optionOrder":2,"optionId":372,"score":2.0,"inverseScore":4.0},{"optionNr":"(25≤BMI＜26)","optionOrder":3,"optionId":373,"score":3.0,"inverseScore":3.0},{"optionNr":"（26≤BMI＜28）","optionOrder":4,"optionId":374,"score":4.0,"inverseScore":2.0},{"optionNr":"(BMI≥28)","optionOrder":5,"optionId":375,"score":5.0,"inverseScore":1.0}]},{"wtxh":76,"wtmc":"您眼睛干涩吗?","wtlx":1,"plsx":10,"xbxz":0,"fxbz":0,"hismc":"eyeDry_10","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":376,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":377,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":378,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":379,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":380,"score":5.0,"inverseScore":1.0}]},{"wtxh":77,"wtmc":"您手脚发凉吗?（不包含因周围温度低或穿的少导致的手脚发冷）","wtlx":1,"plsx":11,"xbxz":0,"fxbz":0,"hismc":"footFearCold_11","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":381,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":382,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":383,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":384,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":385,"score":5.0,"inverseScore":1.0}]},{"wtxh":78,"wtmc":"您胃脘部、背部或腰膝部怕冷吗？（指上腹部、背部、腰部或膝关节等，有一处或多处怕冷）","wtlx":1,"plsx":12,"xbxz":0,"fxbz":0,"hismc":"backFearCold_12","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":386,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":387,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":388,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":389,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":390,"score":5.0,"inverseScore":1.0}]},{"wtxh":79,"wtmc":"您比一般人耐受不了寒冷吗？（指比别人容易害怕冬天或是夏天的冷空调、电扇等）","wtlx":1,"plsx":13,"xbxz":0,"fxbz":0,"hismc":"fearCold_13","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":391,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":392,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":393,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":394,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":395,"score":5.0,"inverseScore":1.0}]},{"wtxh":80,"wtmc":"您容易患感冒吗?（指每年感冒的次数）","wtlx":1,"plsx":14,"xbxz":0,"fxbz":0,"hismc":"cold_14","options":[{"optionNr":"一年＜2 次","optionOrder":1,"optionId":396,"score":1.0,"inverseScore":5.0},{"optionNr":"一年感冒 2-4 次","optionOrder":2,"optionId":397,"score":2.0,"inverseScore":4.0},{"optionNr":"一年感冒5-6 次","optionOrder":3,"optionId":398,"score":3.0,"inverseScore":3.0},{"optionNr":"一年 8 次以上","optionOrder":4,"optionId":399,"score":4.0,"inverseScore":2.0},{"optionNr":"几乎每月","optionOrder":5,"optionId":400,"score":5.0,"inverseScore":1.0}]},{"wtxh":81,"wtmc":"您没有感冒时也会鼻塞、流鼻涕吗?","wtlx":1,"plsx":15,"xbxz":0,"fxbz":0,"hismc":"rhinobyon_15","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":401,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":402,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":403,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":404,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":405,"score":5.0,"inverseScore":1.0}]},{"wtxh":82,"wtmc":"您有口粘口腻，或睡眠打鼾吗？","wtlx":1,"plsx":16,"xbxz":0,"fxbz":0,"hismc":"mouthGreasy_16","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":406,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":407,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":408,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":409,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":410,"score":5.0,"inverseScore":1.0}]},{"wtxh":83,"wtmc":"您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗?","wtlx":1,"plsx":17,"xbxz":0,"fxbz":0,"hismc":"allergy_17","options":[{"optionNr":"从来没有","optionOrder":1,"optionId":411,"score":1.0,"inverseScore":5.0},{"optionNr":"一年 1、 2 次","optionOrder":2,"optionId":412,"score":2.0,"inverseScore":4.0},{"optionNr":"一年 3、 4 次","optionOrder":3,"optionId":413,"score":3.0,"inverseScore":3.0},{"optionNr":"一年 5、 6 次","optionOrder":4,"optionId":414,"score":4.0,"inverseScore":2.0},{"optionNr":"每次遇到上述原因都过敏","optionOrder":5,"optionId":415,"score":5.0,"inverseScore":1.0}]},{"wtxh":84,"wtmc":"您的皮肤容易起荨麻疹吗? (包括风团、风疹块、风疙瘩)","wtlx":1,"plsx":18,"xbxz":0,"fxbz":0,"hismc":"skinUrticaria_18","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":416,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":417,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":418,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":419,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":420,"score":5.0,"inverseScore":1.0}]},{"wtxh":85,"wtmc":"您的皮肤在不知不觉中会出现青紫瘀斑、皮下出血吗?（指皮肤在没有外伤的情况下出现青一块紫一块的情况）","wtlx":1,"plsx":19,"xbxz":0,"fxbz":0,"hismc":"skinBleeding_19","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":421,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":422,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":423,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":424,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":425,"score":5.0,"inverseScore":1.0}]},{"wtxh":86,"wtmc":"您的皮肤一抓就红，并出现抓痕吗?（指被指甲或钝物划过后皮肤的反应）","wtlx":1,"plsx":20,"xbxz":0,"fxbz":0,"hismc":"skinRed_20","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":426,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":427,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":428,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":429,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":430,"score":5.0,"inverseScore":1.0}]},{"wtxh":87,"wtmc":"您皮肤或口唇干吗?","wtlx":1,"plsx":21,"xbxz":0,"fxbz":0,"hismc":"skinDry_21","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":431,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":432,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":433,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":434,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":435,"score":5.0,"inverseScore":1.0}]},{"wtxh":88,"wtmc":"您有肢体麻木或固定部位疼痛的感觉吗？","wtlx":1,"plsx":22,"xbxz":0,"fxbz":0,"hismc":"limbsNumb_22","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":436,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":437,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":438,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":439,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":440,"score":5.0,"inverseScore":1.0}]},{"wtxh":89,"wtmc":"您面部或鼻部有油腻感或者油亮发光吗?（指脸上或鼻子）","wtlx":1,"plsx":23,"xbxz":0,"fxbz":0,"hismc":"faceGreasy_23","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":441,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":442,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":443,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":444,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":445,"score":5.0,"inverseScore":1.0}]},{"wtxh":90,"wtmc":"您面色或目眶晦黯，或出现褐色斑块/斑点吗?","wtlx":1,"plsx":24,"xbxz":0,"fxbz":0,"hismc":"faceDim_24","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":446,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":447,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":448,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":449,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":450,"score":5.0,"inverseScore":1.0}]},{"wtxh":91,"wtmc":"您有皮肤湿疹、疮疖吗？","wtlx":1,"plsx":25,"xbxz":0,"fxbz":0,"hismc":"skinEczema_25","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":451,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":452,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":453,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":454,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":455,"score":5.0,"inverseScore":1.0}]},{"wtxh":92,"wtmc":"您感到口干咽燥、总想喝水吗？","wtlx":1,"plsx":26,"xbxz":0,"fxbz":0,"hismc":"mouthDry_26","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":456,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":457,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":458,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":459,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":460,"score":5.0,"inverseScore":1.0}]},{"wtxh":93,"wtmc":"您感到口苦或嘴里有异味吗?（指口苦或口臭）","wtlx":1,"plsx":27,"xbxz":0,"fxbz":0,"hismc":"bitterTaste_27","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":461,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":462,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":463,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":464,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":465,"score":5.0,"inverseScore":1.0}]},{"wtxh":94,"wtmc":"您腹部肥大吗?（指腹部脂肪肥厚）","wtlx":1,"plsx":28,"xbxz":0,"fxbz":0,"hismc":"bellyLarge_28","options":[{"optionNr":"(腹围<80cm,相当于2.4尺)","optionOrder":1,"optionId":466,"score":1.0,"inverseScore":5.0},{"optionNr":"(腹围 80-85cm,2.4-2.55尺)","optionOrder":2,"optionId":467,"score":2.0,"inverseScore":4.0},{"optionNr":"(腹围 86-90cm,2.56-2.7尺)","optionOrder":3,"optionId":468,"score":3.0,"inverseScore":3.0},{"optionNr":"(腹围 1-105cm,2.71-3.15尺)","optionOrder":4,"optionId":469,"score":4.0,"inverseScore":2.0},{"optionNr":"(腹围>105cm或3.15尺)","optionOrder":5,"optionId":470,"score":5.0,"inverseScore":1.0}]},{"wtxh":95,"wtmc":"您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？（指不喜欢吃凉的食物，或吃了凉的食物后会不舒服）","wtlx":1,"plsx":29,"xbxz":0,"fxbz":0,"hismc":"fearCool_29","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":471,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":472,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":473,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":474,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":475,"score":5.0,"inverseScore":1.0}]},{"wtxh":96,"wtmc":"您有大便黏滞不爽、解不尽的感觉吗?(大便容易粘在马桶或便坑壁上)","wtlx":1,"plsx":30,"xbxz":0,"fxbz":0,"hismc":"stoolStiction_30","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":476,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":477,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":478,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":479,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":480,"score":5.0,"inverseScore":1.0}]},{"wtxh":97,"wtmc":"您容易大便干燥吗?","wtlx":1,"plsx":31,"xbxz":0,"fxbz":0,"hismc":"stoolDry_31","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":481,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":482,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":483,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":484,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":485,"score":5.0,"inverseScore":1.0}]},{"wtxh":98,"wtmc":"您舌苔厚腻或有舌苔厚厚的感觉吗?（如果自我感觉不清楚可由调查员观察后填写）","wtlx":1,"plsx":32,"xbxz":0,"fxbz":0,"hismc":"furStodgily_32","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":486,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":487,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":488,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":489,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":490,"score":5.0,"inverseScore":1.0}]},{"wtxh":99,"wtmc":"您舌下静脉瘀紫或增粗吗？（可由调查员辅助观察后填写）","wtlx":1,"plsx":33,"xbxz":0,"fxbz":0,"hismc":"stasisPurple_33","options":[{"optionNr":"没有（根本不/从来没有）","optionOrder":1,"optionId":491,"score":1.0,"inverseScore":5.0},{"optionNr":"很少（有一点/偶尔）","optionOrder":2,"optionId":492,"score":2.0,"inverseScore":4.0},{"optionNr":"有时（有些/少数时间）","optionOrder":3,"optionId":493,"score":3.0,"inverseScore":3.0},{"optionNr":"经常（相当/多数时间）","optionOrder":4,"optionId":494,"score":4.0,"inverseScore":2.0},{"optionNr":"总是（非常/每天）","optionOrder":5,"optionId":495,"score":5.0,"inverseScore":1.0}]}],
        progressNum: 1,
        count: 1,
        sumNum: 30,
        resultArr: [],
        resultObj: {}
      }
    },
    methods: {
      selectAns(e, item) {
        console.log('aa');
        if (e.target.classList.contains('mint-radio-input')) {
          this.resultObj[item.wtxh + ''] = parseInt(e.target.value)
          console.log(this.resultObj)
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
      }
    },
    mounted(){
      this.sumNum=this.questionsArr.length
      this.questionsArr.forEach(item => {
        let obj = {}
        let tempArr = []
        obj.title = item.wtmc
        obj.wtxh = item.wtxh
        item.options.forEach(item2 => {
          let obj2 = {}
          obj2.label = item2.optionNr
          obj2.value = item2.optionId + ''
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
