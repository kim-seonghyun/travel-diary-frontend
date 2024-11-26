<script setup>
import { ref } from "vue";

import {
  KakaoMap,
  KakaoMapCustomOverlay,
  KakaoMapMarker,
} from "vue3-kakao-maps";

const props = defineProps({
  latitude: {
    type: Number,
    required: true, // 위도가 필수임을 명시
  },
  longitude: {
    type: Number,
    required: true, // 경도가 필수임을 명시
  },
  facilityName: {
    type: String,
    required: true, // 경도가 필수임을 명시
  },
  roadAddress: {
    type: String,
    required: true, // 경도가 필수임을 명시
  },
  phoneNumber: {
    type: String,
    required: true, // 경도가 필수임을 명시
  },
});

const coordinate = {
  lat: props.latitude,
  lng: props.longitude,
};

const content = ` <div
        style="
          padding: 10px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        "
      >
        <div style="font-weight: bold; margin-bottom: 5px">${props.facilityName}</div>
        <div style="display: flex">
          <div style="margin-right: 10px">
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-start">
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${props.roadAddress}</div>
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">번호 : ${props.phoneNumber}</div>
            <div><a href="https://www.kakaocorp.com/main" target="_blank" style="color: blue">홈페이지</a></div>
          </div>
        </div>
      </div>`;

const visible = ref(false);

const onClickKakaoMapMarker = () => {
  visible.value = !visible.value;
};
</script>

<template>
  <KakaoMap
    :lat="coordinate.lat"
    :lng="coordinate.lng"
    :draggable="true"
    style="width: 100%; height: 600px"
  >
    <KakaoMapMarker
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      @onClickKakaoMapMarker="onClickKakaoMapMarker"
      :clickable="true"
    />
    <KakaoMapCustomOverlay
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :yAnchor="1.4"
      :visible="visible"
      :content="content"
    />
  </KakaoMap>
</template>

<style scoped></style>
