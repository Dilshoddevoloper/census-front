<template>
  <div clas="h-100">
    <el-row>
    <!-- <el-row>
      <el-col :span="24" class="text-center">
        <h5>
          Ўзбекистон Республикаси Бандлик ва меҳнат муносабатлари вазирлиги<br> Ташқи меҳнат миграцияси масалалари агентлигининг <br>«Ягона миллий миграция тизими» га хуш келибсиз
        </h5>
      </el-col>
    </el-row> -->
      <el-row class="d-flex justify-content-around mt-100">

        <!-- <div class="text-center">
          Ўзбекистон Республикаси Президентининг маслаҳатчиси топшириғига биноан,
          <br> сайтда ҳудудий маълумотномаларни шакллантириш бўйича профилактик ишлар<br> 
          амалга оширилмоқда. <br> <br>
Профилактик ишларни режалаштирилган тугаш вақти: <br>2020 йил 28 апрел соат 15:00.</div> -->
        <el-row>
          <el-col :xs="24" :sm="12" :lg="12" :xl="12" class="mr-10" style="padding-right:40px">
            <el-col :span="24" class="p-5" >
              <router-link :to="{ name: 'CitizensIndex', query: { type: 1 } }">
                <el-card class="box-card classic-style">
                  <el-row class="mb-2 text-center">
                    <div class="m-1 router-link" style="font-size:18x"> <b>{{ $t('Вилоят кенгаши') }}</b>  {{ $t('депутатлари') }}  <br> {{ $t('рўйхати') }}</div> <br><br>
                  </el-row>
                  <el-row>
                    <el-button type="primary" class="w-100">{{ $t('Рўйхатга ўтиш') }}</el-button>
                  </el-row>
                </el-card>
              </router-link>
            </el-col>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" :xl="12" class="ml-10" style="padding-left:50px">
            <el-col :span="24" class="p-5">
              <router-link :to="{name: 'CitizensIndex', query: { type: 2 }}">
                <el-card class="box-card box-shadow classic-style">
                  <el-row class="mb-2 text-center">
                    <div class="m-1 router-link" style="font-size:18x"> <b>{{ $t('Туман кенгаши') }}</b>  {{ $t('депутатлари') }}  <br> {{ $t('рўйхати') }}</div> <br> <br>
                  </el-row>
                  <el-row>
                    <el-button type="primary" class="w-100">{{ $t('Рўйхатга ўтиш') }}</el-button>
                  </el-row>
                </el-card>
              </router-link>
            </el-col>
          </el-col>
        </el-row>
      </el-row> 
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ChooseType'
}
</script>
<style scoped>

  .box-card{
    border-radius: 10px;
    width: 450px !important;
    margin: 0 auto !important;
  }
  .router-link:hover{
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !important;
  }
  .large-icon{
    font-size: 80px;
  }
  .mt-100 {
    margin-top: 80px;
  }
  .mt-200 {
    margin-top: 240px;
  }
</style>

