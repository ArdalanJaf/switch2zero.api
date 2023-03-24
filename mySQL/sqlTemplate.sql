-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 24, 2023 at 10:33 AM
-- Server version: 10.5.18-MariaDB-cll-lve
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ardalanj_switch2zero`
--

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `initial_cost` int(11) NOT NULL DEFAULT 12000 COMMENT 'Initial cost of single tree purchase (US cents)',
  `upkeep_cost` int(11) NOT NULL DEFAULT 1200 COMMENT 'annual upkeep cost of single tree (US cents)',
  `annual_offset` int(11) NOT NULL DEFAULT 28500 COMMENT 'annual carbon offset of fully grown tree (g)',
  `growth_time` int(11) NOT NULL DEFAULT 60 COMMENT 'months for tree to fully grow',
  `max_annual_purchase` int(11) NOT NULL DEFAULT 55 COMMENT 'maximum number of trees able to purchase in single year',
  `useFractionalExponential` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Use fractional exponential to calculate carbon offset of not-fully-grown trees ? (bool)',
  `applyInflationToUpkeep` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Apply interest rate to upkeep costs, not just initial cost (bool).'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `initial_cost`, `upkeep_cost`, `annual_offset`, `growth_time`, `max_annual_purchase`, `useFractionalExponential`, `applyInflationToUpkeep`) VALUES
(1, 12000, 100, 28500, 60, 55, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `date_modified`) VALUES
(1, 'TomTheAdmin', '13bd5c67407ae4d55a0ca48d900e506d3aa16e3a4c7902d03a26d3f169a139e7', '2023-03-21 16:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `saves`
--

CREATE TABLE `saves` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `formData` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'input form data (JSON object)',
  `resultData` mediumtext NOT NULL COMMENT 'result data (JSON object)',
  `configData` text NOT NULL COMMENT 'config data (JSON object)',
  `dateSaved` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `saves`
--

INSERT INTO `saves` (`id`, `name`, `formData`, `resultData`, `configData`, `dateSaved`) VALUES
(20, 'USA with 3%', '{\"annualCO2\":15520,\"purchases\":[{\"month\":0,\"year\":2023,\"trees\":23},{\"month\":2,\"year\":2023,\"trees\":32},{\"month\":3,\"year\":2024,\"trees\":55},{\"month\":6,\"year\":2025,\"trees\":55},{\"month\":2,\"year\":2026,\"trees\":55},{\"month\":3,\"year\":2027,\"trees\":55},{\"month\":6,\"year\":2028,\"trees\":55},{\"month\":8,\"year\":2029,\"trees\":55},{\"month\":1,\"year\":2030,\"trees\":34},{\"month\":9,\"year\":2030,\"trees\":21},{\"month\":3,\"year\":2031,\"trees\":55},{\"month\":3,\"year\":2032,\"trees\":55}],\"inflationRate\":3}', '{\"graphData\":[{\"date\":1672531200000,\"cost\":276000,\"offset\":0},{\"date\":1675209600000,\"cost\":278300,\"offset\":0.91},{\"date\":1677628800000,\"cost\":664600,\"offset\":1.82},{\"date\":1680307200000,\"cost\":670100,\"offset\":4.01},{\"date\":1682899200000,\"cost\":675600,\"offset\":6.19},{\"date\":1685577600000,\"cost\":681100,\"offset\":8.37},{\"date\":1688169600000,\"cost\":686600,\"offset\":10.55},{\"date\":1690848000000,\"cost\":692100,\"offset\":12.74},{\"date\":1693526400000,\"cost\":697600,\"offset\":14.92},{\"date\":1696118400000,\"cost\":703100,\"offset\":17.1},{\"date\":1698796800000,\"cost\":708600,\"offset\":19.27},{\"date\":1701388800000,\"cost\":714100,\"offset\":21.46},{\"date\":1704067200000,\"cost\":719600,\"offset\":23.64},{\"date\":1706745600000,\"cost\":725100,\"offset\":25.82},{\"date\":1709251200000,\"cost\":730600,\"offset\":28},{\"date\":1711929600000,\"cost\":1415900,\"offset\":30.18},{\"date\":1714521600000,\"cost\":1426900,\"offset\":34.55},{\"date\":1717200000000,\"cost\":1437900,\"offset\":38.91},{\"date\":1719792000000,\"cost\":1448900,\"offset\":43.27},{\"date\":1722470400000,\"cost\":1459900,\"offset\":47.64},{\"date\":1725148800000,\"cost\":1470900,\"offset\":52.01},{\"date\":1727740800000,\"cost\":1481900,\"offset\":56.37},{\"date\":1730419200000,\"cost\":1492900,\"offset\":60.73},{\"date\":1733011200000,\"cost\":1503900,\"offset\":65.09},{\"date\":1735689600000,\"cost\":1514900,\"offset\":69.47},{\"date\":1738368000000,\"cost\":1525900,\"offset\":73.82},{\"date\":1740787200000,\"cost\":1536900,\"offset\":78.18},{\"date\":1743465600000,\"cost\":1547900,\"offset\":82.54},{\"date\":1746057600000,\"cost\":1558900,\"offset\":86.91},{\"date\":1748736000000,\"cost\":1569900,\"offset\":91.27},{\"date\":1751328000000,\"cost\":2281105,\"offset\":95.64},{\"date\":1754006400000,\"cost\":2297605,\"offset\":102.18},{\"date\":1756684800000,\"cost\":2314105,\"offset\":108.72},{\"date\":1759276800000,\"cost\":2330605,\"offset\":115.27},{\"date\":1761955200000,\"cost\":2347105,\"offset\":121.82},{\"date\":1764547200000,\"cost\":2363605,\"offset\":128.36},{\"date\":1767225600000,\"cost\":2380105,\"offset\":134.9},{\"date\":1769904000000,\"cost\":2396605,\"offset\":141.46},{\"date\":1772323200000,\"cost\":3134320,\"offset\":148},{\"date\":1775001600000,\"cost\":3156320,\"offset\":156.73},{\"date\":1777593600000,\"cost\":3178320,\"offset\":165.44},{\"date\":1780272000000,\"cost\":3200320,\"offset\":174.17},{\"date\":1782864000000,\"cost\":3222320,\"offset\":182.91},{\"date\":1785542400000,\"cost\":3244320,\"offset\":191.63},{\"date\":1788220800000,\"cost\":3266320,\"offset\":200.35},{\"date\":1790812800000,\"cost\":3288320,\"offset\":209.08},{\"date\":1793491200000,\"cost\":3310320,\"offset\":217.81},{\"date\":1796083200000,\"cost\":3332320,\"offset\":226.54},{\"date\":1798761600000,\"cost\":3354320,\"offset\":235.27},{\"date\":1801440000000,\"cost\":3376320,\"offset\":243.99},{\"date\":1803859200000,\"cost\":3398320,\"offset\":252.72},{\"date\":1806537600000,\"cost\":4163150,\"offset\":261.44},{\"date\":1809129600000,\"cost\":4190650,\"offset\":272.35},{\"date\":1811808000000,\"cost\":4218150,\"offset\":283.26},{\"date\":1814400000000,\"cost\":4245650,\"offset\":294.17},{\"date\":1817078400000,\"cost\":4273150,\"offset\":305.08},{\"date\":1819756800000,\"cost\":4300650,\"offset\":315.98},{\"date\":1822348800000,\"cost\":4328150,\"offset\":326.89},{\"date\":1825027200000,\"cost\":4355650,\"offset\":337.8},{\"date\":1827619200000,\"cost\":4383150,\"offset\":348.7},{\"date\":1830297600000,\"cost\":4410650,\"offset\":359.62},{\"date\":1832976000000,\"cost\":4438150,\"offset\":369.62},{\"date\":1835481600000,\"cost\":4465650,\"offset\":379.61},{\"date\":1838160000000,\"cost\":4493150,\"offset\":388.34},{\"date\":1840752000000,\"cost\":4520650,\"offset\":397.06},{\"date\":1843430400000,\"cost\":4548150,\"offset\":405.79},{\"date\":1846022400000,\"cost\":5340755,\"offset\":414.53},{\"date\":1848700800000,\"cost\":5373755,\"offset\":425.43},{\"date\":1851379200000,\"cost\":5406755,\"offset\":436.33},{\"date\":1853971200000,\"cost\":5439755,\"offset\":447.23},{\"date\":1856649600000,\"cost\":5472755,\"offset\":458.15},{\"date\":1859241600000,\"cost\":5505755,\"offset\":469.06},{\"date\":1861920000000,\"cost\":5538755,\"offset\":479.97},{\"date\":1864598400000,\"cost\":5571755,\"offset\":490.88},{\"date\":1867017600000,\"cost\":5604755,\"offset\":501.78},{\"date\":1869696000000,\"cost\":5637755,\"offset\":512.69},{\"date\":1872288000000,\"cost\":5670755,\"offset\":521.42},{\"date\":1874966400000,\"cost\":5703755,\"offset\":530.14},{\"date\":1877558400000,\"cost\":5736755,\"offset\":538.88},{\"date\":1880236800000,\"cost\":5769755,\"offset\":547.6},{\"date\":1882915200000,\"cost\":6590795,\"offset\":556.32},{\"date\":1885507200000,\"cost\":6629295,\"offset\":567.24},{\"date\":1888185600000,\"cost\":6667795,\"offset\":578.14},{\"date\":1890777600000,\"cost\":6706295,\"offset\":589.04},{\"date\":1893456000000,\"cost\":6744795,\"offset\":599.97},{\"date\":1896134400000,\"cost\":7285067,\"offset\":610.87},{\"date\":1898553600000,\"cost\":7326967,\"offset\":623.12},{\"date\":1901232000000,\"cost\":7368867,\"offset\":635.38},{\"date\":1903824000000,\"cost\":7410767,\"offset\":647.64},{\"date\":1906502400000,\"cost\":7452667,\"offset\":659.9},{\"date\":1909094400000,\"cost\":7494567,\"offset\":672.15},{\"date\":1911772800000,\"cost\":7536467,\"offset\":682.23},{\"date\":1914451200000,\"cost\":7578367,\"offset\":692.3},{\"date\":1917043200000,\"cost\":7930185,\"offset\":702.38},{\"date\":1919721600000,\"cost\":7974185,\"offset\":713.28},{\"date\":1922313600000,\"cost\":8018185,\"offset\":724.21},{\"date\":1924992000000,\"cost\":8062185,\"offset\":735.11},{\"date\":1927670400000,\"cost\":8106185,\"offset\":746.01},{\"date\":1930089600000,\"cost\":8150185,\"offset\":756.91},{\"date\":1932768000000,\"cost\":9030240,\"offset\":765.65},{\"date\":1935360000000,\"cost\":9079740,\"offset\":776.55},{\"date\":1938038400000,\"cost\":9129240,\"offset\":787.45},{\"date\":1940630400000,\"cost\":9178740,\"offset\":798.38},{\"date\":1943308800000,\"cost\":9228240,\"offset\":809.29},{\"date\":1945987200000,\"cost\":9277740,\"offset\":820.18},{\"date\":1948579200000,\"cost\":9327240,\"offset\":831.09},{\"date\":1951257600000,\"cost\":9376740,\"offset\":842},{\"date\":1953849600000,\"cost\":9426240,\"offset\":852.91},{\"date\":1956528000000,\"cost\":9475740,\"offset\":863.83},{\"date\":1959206400000,\"cost\":9525240,\"offset\":874.74},{\"date\":1961712000000,\"cost\":9574740,\"offset\":885.64},{\"date\":1964390400000,\"cost\":10485375,\"offset\":896.54},{\"date\":1966982400000,\"cost\":10540375,\"offset\":907.45},{\"date\":1969660800000,\"cost\":10595375,\"offset\":918.36},{\"date\":1972252800000,\"cost\":10650375,\"offset\":929.27},{\"date\":1974931200000,\"cost\":10705375,\"offset\":940.19},{\"date\":1977609600000,\"cost\":10760375,\"offset\":951.09},{\"date\":1980201600000,\"cost\":10815375,\"offset\":962},{\"date\":1982880000000,\"cost\":10870375,\"offset\":972.9},{\"date\":1985472000000,\"cost\":10925375,\"offset\":983.8},{\"date\":1988150400000,\"cost\":10980375,\"offset\":994.72},{\"date\":1990828800000,\"cost\":11035375,\"offset\":1005.63},{\"date\":1993248000000,\"cost\":11090375,\"offset\":1016.54},{\"date\":1995926400000,\"cost\":11145375,\"offset\":1027.45},{\"date\":1998518400000,\"cost\":11200375,\"offset\":1038.35},{\"date\":2001196800000,\"cost\":11255375,\"offset\":1049.26},{\"date\":2003788800000,\"cost\":11310375,\"offset\":1060.19},{\"date\":2006467200000,\"cost\":11365375,\"offset\":1068.9},{\"date\":2009145600000,\"cost\":11420375,\"offset\":1077.63},{\"date\":2011737600000,\"cost\":11475375,\"offset\":1086.35},{\"date\":2014416000000,\"cost\":11530375,\"offset\":1095.07},{\"date\":2017008000000,\"cost\":11585375,\"offset\":1103.8},{\"date\":2019686400000,\"cost\":11640375,\"offset\":1112.54},{\"date\":2022364800000,\"cost\":11695375,\"offset\":1121.27},{\"date\":2024784000000,\"cost\":11750375,\"offset\":1129.98},{\"date\":2027462400000,\"cost\":11805375,\"offset\":1138.71},{\"date\":2030054400000,\"cost\":11860375,\"offset\":1147.43},{\"date\":2032732800000,\"cost\":11915375,\"offset\":1156.16},{\"date\":2035324800000,\"cost\":11970375,\"offset\":1164.89},{\"date\":2038003200000,\"cost\":12025375,\"offset\":1173.63},{\"date\":2040681600000,\"cost\":12080375,\"offset\":1182.35},{\"date\":2043273600000,\"cost\":12135375,\"offset\":1188.89},{\"date\":2045952000000,\"cost\":12190375,\"offset\":1195.43},{\"date\":2048544000000,\"cost\":12245375,\"offset\":1201.97},{\"date\":2051222400000,\"cost\":12300375,\"offset\":1208.52},{\"date\":2053900800000,\"cost\":12355375,\"offset\":1215.08},{\"date\":2056320000000,\"cost\":12410375,\"offset\":1220.27},{\"date\":2058998400000,\"cost\":12465375,\"offset\":1225.46},{\"date\":2061590400000,\"cost\":12520375,\"offset\":1230.65},{\"date\":2064268800000,\"cost\":12575375,\"offset\":1235.85},{\"date\":2066860800000,\"cost\":12630375,\"offset\":1241.05},{\"date\":2069539200000,\"cost\":12685375,\"offset\":1246.25},{\"date\":2072217600000,\"cost\":12740375,\"offset\":1251.45},{\"date\":2074809600000,\"cost\":12795375,\"offset\":1256.64},{\"date\":2077488000000,\"cost\":12850375,\"offset\":1261},{\"date\":2080080000000,\"cost\":12905375,\"offset\":1265.36},{\"date\":2082758400000,\"cost\":12960375,\"offset\":1269.73},{\"date\":2085436800000,\"cost\":13015375,\"offset\":1274.1},{\"date\":2087942400000,\"cost\":13070375,\"offset\":1278.46},{\"date\":2090620800000,\"cost\":13125375,\"offset\":1282.82},{\"date\":2093212800000,\"cost\":13180375,\"offset\":1285},{\"date\":2095891200000,\"cost\":13235375,\"offset\":1287.18},{\"date\":2098483200000,\"cost\":13290375,\"offset\":1289.37},{\"date\":2101161600000,\"cost\":13345375,\"offset\":1291.55},{\"date\":2103840000000,\"cost\":13400375,\"offset\":1293.73},{\"date\":2106432000000,\"cost\":13455375,\"offset\":1295.91},{\"date\":2109110400000,\"cost\":13510375,\"offset\":1298.09},{\"date\":2111702400000,\"cost\":13565375,\"offset\":1300.27},{\"date\":2114380800000,\"cost\":13620375,\"offset\":1302.46},{\"date\":2117059200000,\"cost\":13675375,\"offset\":1304.64},{\"date\":2119478400000,\"cost\":13730375,\"offset\":1306.82},{\"date\":2122156800000,\"cost\":13785375,\"offset\":1309}],\"totalTime\":{\"years\":14,\"months\":4},\"totalTrees\":550,\"monthlyCO2Offset\":1309,\"monthlyCO2Emmissions\":1293.33,\"carbonNeutralDate\":2103840000000,\"costs\":{\"initial\":9983050,\"upkeep\":3802325,\"ongoingUpkeep\":55000},\"treesNeeded\":-6}', '{\"initial_cost\":12000,\"upkeep_cost\":100,\"annual_offset\":28500,\"growth_time\":60,\"max_annual_purchase\":55,\"useFractionalExponential\":0,\"applyInflationToUpkeep\":0}', '2023-03-21 21:23:17'),
(19, 'uk 3 year plan', '{\"annualCO2\":5550,\"purchases\":[{\"month\":0,\"year\":2023,\"trees\":23},{\"month\":2,\"year\":2023,\"trees\":32},{\"month\":3,\"year\":2024,\"trees\":45},{\"month\":6,\"year\":2025,\"trees\":55},{\"month\":2,\"year\":2026,\"trees\":55}],\"inflationRate\":\"\"}', '{\"graphData\":[{\"date\":1672531200000,\"cost\":276000,\"offset\":0},{\"date\":1675209600000,\"cost\":278300,\"offset\":0.91},{\"date\":1677628800000,\"cost\":664600,\"offset\":1.82},{\"date\":1680307200000,\"cost\":670100,\"offset\":4.01},{\"date\":1682899200000,\"cost\":675600,\"offset\":6.19},{\"date\":1685577600000,\"cost\":681100,\"offset\":8.37},{\"date\":1688169600000,\"cost\":686600,\"offset\":10.55},{\"date\":1690848000000,\"cost\":692100,\"offset\":12.74},{\"date\":1693526400000,\"cost\":697600,\"offset\":14.92},{\"date\":1696118400000,\"cost\":703100,\"offset\":17.1},{\"date\":1698796800000,\"cost\":708600,\"offset\":19.27},{\"date\":1701388800000,\"cost\":714100,\"offset\":21.46},{\"date\":1704067200000,\"cost\":719600,\"offset\":23.64},{\"date\":1706745600000,\"cost\":725100,\"offset\":25.82},{\"date\":1709251200000,\"cost\":730600,\"offset\":28},{\"date\":1711929600000,\"cost\":1276100,\"offset\":30.18},{\"date\":1714521600000,\"cost\":1286100,\"offset\":34.15},{\"date\":1717200000000,\"cost\":1296100,\"offset\":38.12},{\"date\":1719792000000,\"cost\":1306100,\"offset\":42.09},{\"date\":1722470400000,\"cost\":1316100,\"offset\":46.05},{\"date\":1725148800000,\"cost\":1326100,\"offset\":50.02},{\"date\":1727740800000,\"cost\":1336100,\"offset\":53.99},{\"date\":1730419200000,\"cost\":1346100,\"offset\":57.95},{\"date\":1733011200000,\"cost\":1356100,\"offset\":61.92},{\"date\":1735689600000,\"cost\":1366100,\"offset\":65.9},{\"date\":1738368000000,\"cost\":1376100,\"offset\":69.85},{\"date\":1740787200000,\"cost\":1386100,\"offset\":73.81},{\"date\":1743465600000,\"cost\":1396100,\"offset\":77.78},{\"date\":1746057600000,\"cost\":1406100,\"offset\":81.75},{\"date\":1748736000000,\"cost\":1416100,\"offset\":85.72},{\"date\":1751328000000,\"cost\":2086100,\"offset\":89.68},{\"date\":1754006400000,\"cost\":2101600,\"offset\":95.83},{\"date\":1756684800000,\"cost\":2117100,\"offset\":101.97},{\"date\":1759276800000,\"cost\":2132600,\"offset\":108.13},{\"date\":1761955200000,\"cost\":2148100,\"offset\":114.28},{\"date\":1764547200000,\"cost\":2163600,\"offset\":120.43},{\"date\":1767225600000,\"cost\":2179100,\"offset\":126.57},{\"date\":1769904000000,\"cost\":2194600,\"offset\":132.73},{\"date\":1772323200000,\"cost\":2870100,\"offset\":138.87},{\"date\":1775001600000,\"cost\":2891100,\"offset\":147.21},{\"date\":1777593600000,\"cost\":2912100,\"offset\":155.53},{\"date\":1780272000000,\"cost\":2933100,\"offset\":163.86},{\"date\":1782864000000,\"cost\":2954100,\"offset\":172.2},{\"date\":1785542400000,\"cost\":2975100,\"offset\":180.52},{\"date\":1788220800000,\"cost\":2996100,\"offset\":188.85},{\"date\":1790812800000,\"cost\":3017100,\"offset\":197.18},{\"date\":1793491200000,\"cost\":3038100,\"offset\":205.52},{\"date\":1796083200000,\"cost\":3059100,\"offset\":213.85},{\"date\":1798761600000,\"cost\":3080100,\"offset\":222.18},{\"date\":1801440000000,\"cost\":3101100,\"offset\":230.5},{\"date\":1803859200000,\"cost\":3122100,\"offset\":238.84},{\"date\":1806537600000,\"cost\":3143100,\"offset\":247.16},{\"date\":1809129600000,\"cost\":3164100,\"offset\":255.5},{\"date\":1811808000000,\"cost\":3185100,\"offset\":263.83},{\"date\":1814400000000,\"cost\":3206100,\"offset\":272.16},{\"date\":1817078400000,\"cost\":3227100,\"offset\":280.48},{\"date\":1819756800000,\"cost\":3248100,\"offset\":288.8},{\"date\":1822348800000,\"cost\":3269100,\"offset\":297.14},{\"date\":1825027200000,\"cost\":3290100,\"offset\":305.47},{\"date\":1827619200000,\"cost\":3311100,\"offset\":313.8},{\"date\":1830297600000,\"cost\":3332100,\"offset\":322.14},{\"date\":1832976000000,\"cost\":3353100,\"offset\":329.55},{\"date\":1835481600000,\"cost\":3374100,\"offset\":336.96},{\"date\":1838160000000,\"cost\":3395100,\"offset\":343.12},{\"date\":1840752000000,\"cost\":3416100,\"offset\":349.27},{\"date\":1843430400000,\"cost\":3437100,\"offset\":355.42},{\"date\":1846022400000,\"cost\":3458100,\"offset\":361.56},{\"date\":1848700800000,\"cost\":3479100,\"offset\":367.71},{\"date\":1851379200000,\"cost\":3500100,\"offset\":373.85},{\"date\":1853971200000,\"cost\":3521100,\"offset\":380},{\"date\":1856649600000,\"cost\":3542100,\"offset\":386.15},{\"date\":1859241600000,\"cost\":3563100,\"offset\":392.31},{\"date\":1861920000000,\"cost\":3584100,\"offset\":398.46},{\"date\":1864598400000,\"cost\":3605100,\"offset\":404.6},{\"date\":1867017600000,\"cost\":3626100,\"offset\":410.74},{\"date\":1869696000000,\"cost\":3647100,\"offset\":416.89},{\"date\":1872288000000,\"cost\":3668100,\"offset\":421.26},{\"date\":1874966400000,\"cost\":3689100,\"offset\":425.62},{\"date\":1877558400000,\"cost\":3710100,\"offset\":429.99},{\"date\":1880236800000,\"cost\":3731100,\"offset\":434.35},{\"date\":1882915200000,\"cost\":3752100,\"offset\":438.71},{\"date\":1885507200000,\"cost\":3773100,\"offset\":443.08},{\"date\":1888185600000,\"cost\":3794100,\"offset\":447.44},{\"date\":1890777600000,\"cost\":3815100,\"offset\":451.8},{\"date\":1893456000000,\"cost\":3836100,\"offset\":456.17},{\"date\":1896134400000,\"cost\":3857100,\"offset\":460.53},{\"date\":1898553600000,\"cost\":3878100,\"offset\":464.89},{\"date\":1901232000000,\"cost\":3899100,\"offset\":469.26},{\"date\":1903824000000,\"cost\":3920100,\"offset\":473.62},{\"date\":1906502400000,\"cost\":3941100,\"offset\":477.99},{\"date\":1909094400000,\"cost\":3962100,\"offset\":482.35},{\"date\":1911772800000,\"cost\":3983100,\"offset\":484.53},{\"date\":1914451200000,\"cost\":4004100,\"offset\":486.71},{\"date\":1917043200000,\"cost\":4025100,\"offset\":488.89},{\"date\":1919721600000,\"cost\":4046100,\"offset\":491.07},{\"date\":1922313600000,\"cost\":4067100,\"offset\":493.26},{\"date\":1924992000000,\"cost\":4088100,\"offset\":495.44},{\"date\":1927670400000,\"cost\":4109100,\"offset\":497.62},{\"date\":1930089600000,\"cost\":4130100,\"offset\":499.8}],\"totalTime\":{\"years\":8,\"months\":3},\"totalTrees\":210,\"monthlyCO2Offset\":499.8,\"monthlyCO2Emmissions\":462.5,\"carbonNeutralDate\":1898553600000,\"costs\":{\"initial\":2520000,\"upkeep\":1610100,\"ongoingUpkeep\":21000},\"treesNeeded\":-15}', '{\"initial_cost\":12000,\"upkeep_cost\":100,\"annual_offset\":28500,\"growth_time\":60,\"max_annual_purchase\":55,\"useFractionalExponential\":0,\"applyInflationToUpkeep\":0}', '2023-03-21 21:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(128) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`, `entry_date`) VALUES
(6, 1, 'u5PGnBzJscQyjkKDU1YiIf9EdgmK48IQASgVANoP5IsDbDbSoZjPvxKq4OlElO04LYUkY0ZLGvJRwWprs7UEr13Et3W1Yc4ZsNr7kVTRdkZUAENpzcY1679420492777', '2023-03-21 17:41:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saves`
--
ALTER TABLE `saves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `saves`
--
ALTER TABLE `saves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
