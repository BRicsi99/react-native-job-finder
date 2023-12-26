import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import * as jsonData from "../../data.json";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  // const { data, isLoading, error, refetch } = useFetch("/jobs-details", {
  //   job_id: params.id,
  // });

  const data = jsonData.data.find((item) => item.job_id == params.id);

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const onRefresh = () => {};
  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
          title='Qualifications'
          points={data.job_highlights.Qualifications ?? ['N/A']}
        />
      case "About":
        return <JobAbout
          info={data.job_description ?? "No data provided"}
        />
      case "Responsibilities":
        return <Specifics
          title='Responsibilities'
          points={data.job_highlights.Responsibilities ?? ['N/A']}
        />
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
            ),
            headerTitle: "",
          },
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {
            // isLoading ? (
            //   <ActivityIndicator size="large" color={COLORS.primary} />
            // ) : error ? (
            //   <Text style={{ color: COLORS.error, textAlign: "center" }}>
            //     Something went wrong
            //   </Text>
            // ) :
            // data.length === 0 ? (
            //   <Text style={{ color: COLORS.error, textAlign: "center" }}>
            //     No data
            //   </Text>
            // ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100,
              }}
            >
              <Company
                companyLogo={data.company_logo} //{data[0].company_logo}
                jobTitle={data.job_title} //{data[0].job_title}
                companyName={data.employer_name} //{data[0].employer_name}
                Location={data.job_country} //{data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
            // )
          }
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
