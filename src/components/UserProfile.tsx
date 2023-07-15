import React from "react";
import "../assets/scss/userprofile.scss";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaLink, FaTwitter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { PiBuildingsFill } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import Octocat from "../assets/images/octocat.png";
import { Octokit } from "@octokit/core";

interface UserProfileProps {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: string;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
}

export const UserProfile = () => {
  const [theme, setTheme] = React.useState("LIGHT");
  const [user, setUser] = React.useState<UserProfileProps>();
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const AUTH_CODE = import.meta.env.VITE_APP_AUTH_CODE as string;

  const octokit = new Octokit({
    auth: AUTH_CODE,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    username: string
  ) => {
    e.preventDefault();
    setLoading(true);
    octokit
      .request(`GET /users/${username}`)
      .then((response) => {
        console.log(response);
        const data = response?.data as UserProfileProps;
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="container__profile">
        <div className="container__profile--header">
          <p className="container__profile--logo">devfinder</p>
          <div
            className="container__profile--theme"
            onClick={() => {
              if (theme === "LIGHT") {
                setTheme("DARK");
              } else {
                setTheme("LIGHT");
              }
            }}
          >
            <p className="container__profile--text">{theme}</p>
            {theme === "DARK" ? (
              <MdDarkMode className="container__profile--icon" />
            ) : (
              <MdLightMode className="container__profile--icon" />
            )}
          </div>
        </div>
        <div className="container__profile--input">
          <FiSearch
            style={{
              color: "#0c57af",
              position: "absolute",
              top: "10px",
              left: "15px",
              height: "24px",
              width: "24px",
            }}
          />
          <input
            className="container__profile--search"
            type="text"
            placeholder="Search GitHub username..."
            value={searchValue}
            onChange={handleChange}
            />
          <button
            className="container__profile--button"
            onClick={(e) => {
              handleSubmit(e, searchValue);
            }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
        <div className="container__profile--details">
          <img
            className="container__profile--avatar"
            src={user?.avatar_url || Octocat}
            alt="avatar"
          />
          <div className="container__profile--info">
            <div className="container__profile--top">
              <p className="container__profile--name">
                {user?.name || "The Octocat"}
              </p>
              <p className="container__profile--date">
                Joined{" "}
                {new Date(
                  user?.created_at || "2021-09-01T23:00:00Z"
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className="container__profile--username">
              {user?.login || "@octocat"}
            </p>
            <p className="container__profile--bio">
              {user?.bio || "This profile has no bio."}
            </p>
            <div className="container__profile--stats">
              <div className="container__profile--detail">
                <p className="container__profile--title">Repos</p>
                <p className="container__profile--number">
                  {user?.public_repos || 0}
                </p>
              </div>
              <div className="container__profile--detail">
                <p className="container__profile--title">Followers</p>
                <p className="container__profile--number">
                  {user?.followers || 0}
                </p>
              </div>
              <div className="container__profile--detail">
                <p className="container__profile--title">Following</p>
                <p className="container__profile--number">
                  {user?.following || 0}
                </p>
              </div>
            </div>
            <div className="container__profile--links">
              <div className="container__profile--lnk">
                <div className="container__profile--link">
                  <MdLocationPin
                    style={{ color: !user?.location ? "#8e94a4" : "#fff" }}
                  />
                  <p
                    className="container__profile--txt"
                    style={{ color: !user?.location ? "#8e94a4" : "#fff" }}
                  >
                    {user?.location || "Not available"}
                  </p>
                </div>
                <div className="container__profile--link">
                  <FaLink style={{ color: !user?.blog ? "#8e94a4" : "#fff" }} />
                  <p
                    className="container__profile--txt"
                    style={{ color: !user?.blog ? "#8e94a4" : "#fff" }}
                  >
                    {user?.blog || "Not available"}
                  </p>
                </div>
              </div>
              <div className="container__profile--lnk">
                <div className="container__profile--link">
                  <FaTwitter
                    style={{
                      color: !user?.twitter_username ? "#8e94a4" : "#fff",
                    }}
                  />
                  <p
                    className="container__profile--txt"
                    style={{
                      color: !user?.twitter_username ? "#8e94a4" : "#fff",
                    }}
                  >
                    {user?.twitter_username || "Not available"}
                  </p>
                </div>
                <div className="container__profile--link">
                  <PiBuildingsFill
                    style={{ color: !user?.company ? "#8e94a4" : "#fff" }}
                  />
                  <p
                    className="container__profile--txt"
                    style={{ color: !user?.company ? "#8e94a4" : "#fff" }}
                  >
                    {user?.company || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
