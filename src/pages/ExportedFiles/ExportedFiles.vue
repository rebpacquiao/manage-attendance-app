<template>
  <NFlex class="page-heading" vertical>
    <h1>Exported Files</h1>
    <h5>No file to download</h5>
  </NFlex>
  <NCard class="col-card w-100">
    <NSpace class="col-exported-files">
      <div class="no-data">
        <img :src="imageUrl" alt="Sprout" />
        <h1>There are no exported items to show on your end.</h1>
        <h4>
          Search for the logs and click
          <NGradientText type="warning">Export</NGradientText> to generate the
          file here.
        </h4>
      </div>
    </NSpace>
  </NCard>
</template>

<script>
export default {
  name: "ExportedFiles",
};
</script>
<script setup>
import { NCard, NSpace, NGradientText, NFlex } from "naive-ui";

const imageUrl = require("@/assets/no-payslip-icon.png");
</script>
