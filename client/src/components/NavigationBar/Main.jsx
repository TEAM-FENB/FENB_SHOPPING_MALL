import {
  useMantineColorScheme,
  Navbar,
  Flex,
  Image,
  Autocomplete,
  ActionIcon,
  Group,
  Stack,
  Text,
  Menu,
  Avatar,
  Tooltip,
} from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import { SlHandbag } from 'react-icons/sl';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { forwardRef, useEffect, useState } from 'react';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { DarkMode } from '../index';
import { userState } from '../../recoil/atoms';
import { getDecodeSearch } from '../../utils/location';
import { signOut } from '../../api';
import { PATH } from '../../constants';
import { useSearchProducts } from '../../hooks/products';

const topList = [
  { kr: '회원가입', en: 'signup' },
  { kr: '로그인', en: 'signin' },
];

const NavigationAvatar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const { search: rawSearch, pathname } = useLocation();
  const { search } = getDecodeSearch(rawSearch);

  const handleSignOutClick = async () => {
    await signOut();
    setUser(null);
    navigate(PATH.MAIN);
  };

  const handleRedirectClick = (path, state) => {
    navigate(path, { state });
  };

  return (
    <Menu shadow="md" width="20rem" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <Menu.Target>
        <Avatar radius="xl" size="5rem" sx={{ cursor: 'pointer' }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label fz="1.6rem" fw="bold">
          {user ? `${user.username}님 환영합니다.` : '로그인이 필요합니다.'}
        </Menu.Label>
        <Menu.Divider />

        <Menu.Item
          fz="1.6rem"
          fw="bold"
          disabled={!user}
          icon={<BsFillSuitHeartFill size="2rem" color="tomato" />}
          onClick={() => handleRedirectClick(PATH.WISHLIST)}>
          관심상품
        </Menu.Item>
        <Menu.Item
          fz="1.6rem"
          fw="bold"
          disabled={!user}
          icon={<SlHandbag size="2rem" />}
          onClick={() => handleRedirectClick(PATH.CART)}>
          장바구니
        </Menu.Item>

        <Menu.Divider />

        {user ? (
          <Menu.Item fz="1.6rem" fw="bold" color="red" onClick={handleSignOutClick}>
            로그아웃
          </Menu.Item>
        ) : (
          topList.map(({ kr, en }) => (
            <Menu.Item
              key={en}
              fz="1.6rem"
              fw="bold"
              onClick={() => handleRedirectClick(PATH[en.toUpperCase()], `${pathname}${search}`)}>
              {kr}
            </Menu.Item>
          ))
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

const TopArea = () => {
  const [user, setUser] = useRecoilState(userState);
  const { search: rawSearch, pathname } = useLocation();
  const { search } = getDecodeSearch(rawSearch);
  const navigate = useNavigate();

  const handleSignOutClick = async () => {
    await signOut();
    setUser(null);
    navigate(PATH.MAIN);
  };

  return (
    <Navbar.Section pt="xs">
      <Flex gap="lg" align="center" justify="flex-end" fz="1.3rem" color="#222222">
        {user ? (
          <>
            <Text onClick={handleSignOutClick} sx={{ cursor: 'pointer' }}>
              로그아웃
            </Text>
            <Text>{user.username}님 환영합니다.</Text>
          </>
        ) : (
          topList.map(({ kr, en }) => (
            <Link key={en} to={PATH[en.toUpperCase()]} state={`${pathname}${search}`}>
              {kr}
            </Link>
          ))
        )}
        <DarkMode />
      </Flex>
    </Navbar.Section>
  );
};

const AutoCompleteItem = forwardRef(({ value, id, onMouseDown, ...rest }, ref) => {
  const navigate = useNavigate();

  const handleMouseDown = e => {
    onMouseDown(e);
    navigate(`${PATH.PRODUCTS}/${id}`);
  };

  return (
    <Text ref={ref} onMouseDown={handleMouseDown} value={value} {...rest}>
      {value}
    </Text>
  );
});

const SearchBar = () => {
  const searchProducts = useSearchProducts();
  const [searchInput, setSearchInput] = useState('');
  const [debounced] = useDebouncedValue(searchInput, 200);
  const { search: rawSearch, pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    document.activeElement.blur();

    navigate(`${PATH.CATEGORY}?search=${searchInput}`);
  };

  useEffect(() => {
    const { search, searchValue } = getDecodeSearch(rawSearch);
    setSearchInput(pathname.includes('category') && search.includes('search') ? searchValue : '');
  }, [rawSearch, setSearchInput, pathname]);

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        size="xl"
        icon={<BiSearch size="2rem" />}
        placeholder="상품 검색"
        data={searchProducts}
        radius="xl"
        itemComponent={AutoCompleteItem}
        value={searchInput}
        onChange={setSearchInput}
        filter={(_, item) =>
          item.value.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.en.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.en.toLowerCase().includes(debounced.toLowerCase().trim())
        }
        nothingFound={<Text>검색결과가 없습니다.</Text>}
      />
    </form>
  );
};

const MiddleArea = () => {
  const { pathname } = useLocation();

  return (
    <Navbar.Section>
      <Flex justify="flex-end" align="center" gap="xl">
        <SearchBar />
        <Link to={PATH.WISHLIST} state={pathname}>
          <Tooltip label="관심상품">
            <ActionIcon size="xl">
              <BsFillSuitHeartFill size="2.8rem" color="tomato" />
            </ActionIcon>
          </Tooltip>
        </Link>
        <Link to={PATH.CART} state={pathname}>
          <Tooltip label="장바구니">
            <ActionIcon size="xl">
              <SlHandbag size="2.8rem" />
            </ActionIcon>
          </Tooltip>
        </Link>
      </Flex>
    </Navbar.Section>
  );
};

const UtilArea = () => {
  const matches = useMediaQuery('(min-width: 880px)');

  return (
    <Stack>
      {matches ? (
        <>
          <TopArea />
          <MiddleArea />
        </>
      ) : (
        <>
          <Group position="right">
            <NavigationAvatar />
            <DarkMode />
          </Group>
          <SearchBar />
        </>
      )}
    </Stack>
  );
};

const Main = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group position="apart">
      <Link to={PATH.MAIN}>
        <Image
          width="10rem"
          pl="1rem"
          src={`images/logo/${colorScheme === 'dark' ? 'darkMain' : 'main'}.svg`}
          alt="486"
        />
      </Link>
      <UtilArea />
    </Group>
  );
};

export default Main;
