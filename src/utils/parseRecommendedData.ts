import axios from 'axios';
import { convertRawViewsToString, parseVideoDuration, timeSince } from './index';
import { YOUTUBE_API_URL } from './constants';
import { Item, RecommendedVideos } from '../Types';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async (items: Item[], videoId: string) => {
    try {
        // Initialize arrays to store video and channel IDs
        const videoIds: string[] = [];
        const channelIds: string[] = [];
        const newItems: Item[] = [];
        // Loop through each item
        items.forEach((item: Item) => {
            // Add the channel ID to the channelIds array
            channelIds.push(item.snippet.channelId);
            // If the item has a video ID, add it to the videoIds array and the item to the newItems array
            if (item.contentDetails?.upload?.videoId) {
                videoIds.push(item.contentDetails.upload.videoId);
                newItems.push(item);
            }
        });
        // Make a GET request to the YouTube API to get video details
        const {
            data: { items: videosData },
        } = await axios.get(
            `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`,
        );
        // Initialize an array to store the parsed data
        const parsedData: RecommendedVideos[] = [];

        newItems.forEach((item, index) => {
            // If the index is greater than or equal to the length of videosData, return
            if (index >= videosData.length) return;
            // If the video ID of the item is the same as the input videoId, return
            if (videoId === item?.contentDetails?.upload?.videoId) return;
            // Add a new RecommendedVideos object to the parsedData array
            parsedData.push({
                videoId: item.contentDetails.upload.videoId,
                videoTitle: item.snippet.title,
                videoThumbnail: item.snippet.thumbnails.medium.url,
                videoDuration: parseVideoDuration(videosData[index].contentDetails.duration),
                videoViews: convertRawViewsToString(videosData[index].statistics.viewCount),
                videoAge: timeSince(new Date(item.snippet.publishedAt)),
                channelInfo: {
                    id: item.snippet.channelId,
                    name: item.snippet.channelTitle,
                },
            });
        });

        return parsedData;
    } catch (err) {
        console.log(err);
    }
};
