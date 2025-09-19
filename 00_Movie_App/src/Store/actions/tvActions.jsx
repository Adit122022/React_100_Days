export { removetv } from "../reducers/tvSlice";
import instance from "../../utils/Axios";
import { loadtv } from "../reducers/tvSlice";


export const asyncLoadtv = (id) => async (dispatch, getState) => {
  try {
    const  detail  = await instance.get(`/tv/${id}`);
    const  externalid  = await instance.get(`/tv/${id}/external_ids`);
    const  recommendations  = await instance.get(`/tv/${id}/recommendations`);
    const  translations  = await instance.get(`/tv/${id}/translations`);
    const  similar  = await instance.get(`/tv/${id}/similar`);
    const  videos  = await instance.get(`/tv/${id}/videos`);
    const  watchproviders  = await instance.get(`/tv/${id}/watch/providers`);

    const ultimatedata = {
        detail: detail.data,
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        translations: translations.data.translations.map((t) => t.english_name),
        similar: similar.data.results,
        videos: videos.data.results.find(m => m.type === "Trailer"),
        watchproviders: watchproviders.data.results.IN,
    }
    console.log(ultimatedata);
    
    dispatch(loadtv(ultimatedata));
    
  } catch (error) {
    console.log(error);
  }
};
