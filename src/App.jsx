import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heart, Home, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import heroOnodYukemuri from "./assets/hero-onod-yukemuri.png";
import heroYukemuriMotion from "./assets/hero-yukemuri-motion.mp4";
import productSet from "./assets/product-set.jpg";
import productSpray from "./assets/product-spray.jpg";
import productBathTeaSingle from "./assets/product-bath-tea-single.png";
import productShampoo from "./assets/product-shampoo.jpg";
import productBodywash from "./assets/product-bodywash.png";
import categoryHair from "./assets/category-hair.jpg";
import categoryBody from "./assets/category-body.jpg";
import categoryBathOnsen from "./assets/category-bath-onsen.png";
import categorySaunaStones from "./assets/category-sauna-stones.png";
import therapyBg from "./assets/therapy-bg.jpg";
import onodLogo from "./assets/onod-logo.svg";
import onodSaunaSteam from "./assets/onod-sauna-steam.png";

const navItems = ["오노드", "제품", "B2B 문의", "뉴스레터"];

const heroSlides = [
  {
    title: "湯けむり",
    subtitle: "YUKEMURI",
    body: "일본 기소 숲의 히노키 향과 온천의 온기,\n티백 한 포로 즐기는 프리미엄 료칸 배스 티",
    image: heroOnodYukemuri,
    tone: "onod",
  },
  {
    title: "YUKEMURI MOTION",
    video: heroYukemuriMotion,
    tone: "motion",
  },
];

const products = [
  {
    name: "유케무리 기소 히노키 배스 티 세트",
    line: "배스",
    desc: "유케무리 기소 히노키 배스 티 세트",
    price: "38,000원",
    discount: "20%",
    image: productSet,
    tags: ["BEST", "SET"],
  },
  {
    name: "유케무리 기소 히노키 배스 티",
    line: "배스",
    desc: "유케무리 기소 히노키 배스 티",
    price: "18,000원",
    discount: "15%",
    image: productBathTeaSingle,
    tags: ["BEST"],
  },
  {
    name: "오노드 사우나 울 캡",
    line: "사우나",
    desc: "오노드 사우나 울 캡",
    price: "26,000원",
    discount: "10%",
    image: productShampoo,
    tags: ["NEW"],
  },
  {
    name: "오노드 사우나 아로마 타월 미스트",
    line: "사우나",
    desc: "오노드 사우나 아로마 타월 미스트",
    price: "24,000원",
    discount: "10%",
    image: productBodywash,
    tags: ["NEW"],
  },
];

const shopCategories = ["전체", "배스", "사우나", "바디", "헤어"];

const categoryProductMap = {
  BATH: "배스",
  BODY: "바디",
  HAIR: "헤어",
  SAUNA: "사우나",
};

const parseWon = (value) => Number(value.replace(/[^\d]/g, ""));

const formatWon = (value) => `${value.toLocaleString("ko-KR")}원`;

const shopProducts = [
  ...products,
  {
    name: "유케무리 히노키 배스 티 리필",
    line: "배스",
    price: "15,000원",
    discount: "10%",
    image: productSet,
    tags: ["NEW"],
  },
  {
    name: "오노드 온천 솔트 파우치",
    line: "배스",
    price: "22,000원",
    discount: "15%",
    image: categoryBathOnsen,
    tags: ["BEST"],
  },
  {
    name: "오노드 사우나 스톤 오일",
    line: "사우나",
    price: "32,000원",
    discount: "10%",
    image: categorySaunaStones,
    tags: ["NEW"],
  },
  {
    name: "오노드 릴랙스 바디워시",
    line: "바디",
    price: "21,000원",
    discount: "12%",
    image: productBodywash,
    tags: ["NEW"],
  },
  {
    name: "오노드 바디 로션",
    line: "바디",
    price: "24,000원",
    discount: "10%",
    image: categoryBody,
    tags: ["SET"],
  },
  {
    name: "오노드 두피 샴푸",
    line: "헤어",
    price: "28,000원",
    discount: "15%",
    image: productShampoo,
    tags: ["BEST"],
  },
  {
    name: "오노드 헤어 리추얼 미스트",
    line: "헤어",
    price: "19,000원",
    discount: "8%",
    image: categoryHair,
    tags: ["NEW"],
  },
  {
    name: "오노드 사우나 타월 세트",
    line: "사우나",
    price: "29,000원",
    discount: "10%",
    image: productSpray,
    tags: ["SET"],
  },
];

const CART_STORAGE_KEY = "onod-cart";

const getProductKey = (product) => `${product.line}::${product.name}`;

const categories = [
  {
    title: "BATH",
    body: "입욕의 시간을 깊은 휴식으로 채우는 배스 제품",
    image: categoryBathOnsen,
    size: "wide",
  },
  {
    title: "BODY",
    body: "샤워 후 피부 당김 없이 촉촉하게 남는 바디케어",
    image: categoryBody,
  },
  {
    title: "HAIR",
    body: "린스 없이도 부드럽고 건강하게 감기는 헤어케어",
    image: categoryHair,
  },
  {
    title: "SAUNA",
    body: "사우나 시간을 더 편안하게 완성하는 전용 용품",
    image: categorySaunaStones,
  },
];

function Header({ isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("전체");
  const searchInputRef = useRef(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchSource =
    searchCategory === "전체" ? shopProducts : shopProducts.filter((product) => product.line === searchCategory);
  const searchResults = normalizedQuery
    ? searchSource
        .filter((product) =>
          [product.name, product.line, product.desc || ""].join(" ").toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 6)
    : searchSource.slice(0, 4);

  const renderHighlightedText = (text) => {
    if (!normalizedQuery) return text;

    const lowerText = text.toLowerCase();
    const matchIndex = lowerText.indexOf(normalizedQuery);

    if (matchIndex < 0) return text;

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + normalizedQuery.length);
    const after = text.slice(matchIndex + normalizedQuery.length);

    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  useEffect(() => {
    if (!searchOpen) return;

    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 80);

    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  return (
    <header className="site-header">
      <nav className="nav-bar" aria-label="주요 메뉴">
        <button className="icon-button menu-button" onClick={() => setOpen(true)} aria-label="메뉴 열기">
          <Menu size={22} />
        </button>
        <a className="brand" href="#top" aria-label="오노드 홈">
          <img src={onodLogo} alt="오노드" />
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions" aria-label="빠른 작업">
          <button
            className="icon-button"
            type="button"
            aria-label={searchOpen ? "검색 닫기" : "검색"}
            onClick={() => setSearchOpen((current) => !current)}
          >
            <Search size={20} />
          </button>
          <a className="icon-button" href={isLoggedIn ? "#사용자" : "#로그인"} aria-label="계정">
            <UserRound size={20} />
          </a>
          <a className="icon-button" href="#장바구니" aria-label="장바구니">
            <ShoppingBag size={20} />
          </a>
        </div>
      </nav>
      <div className={`search-panel ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <div className="search-inner">
          <label className="search-field">
            <Search size={19} />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              placeholder="제품명 또는 카테고리 검색"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <button
            className="search-close"
            type="button"
            aria-label="검색 닫기"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <X size={20} />
          </button>
          <div className="search-categories" aria-label="검색 카테고리">
            {shopCategories.map((category) => (
              <button
                key={category}
                className={searchCategory === category ? "is-active" : ""}
                type="button"
                onClick={() => setSearchCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="search-results">
            <span>{normalizedQuery ? "SEARCH RESULT" : "RECOMMEND"}</span>
            {searchResults.length > 0 ? (
              <div className="search-result-grid">
                {searchResults.map((product) => (
                  <a
                    key={`${product.line}-${product.name}`}
                    href={`#제품?category=${encodeURIComponent(product.line)}&product=${encodeURIComponent(product.name)}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <img src={productBathTeaSingle} alt="" />
                    <div>
                      <strong>{renderHighlightedText(product.name)}</strong>
                      <small>
                        {product.line} / {product.price}
                      </small>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="search-empty">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="drawer-panel">
          <div className="drawer-head">
            <div className="drawer-quick-actions" aria-label="빠른 이동">
              <a className="drawer-quick-link" href="#top" onClick={() => setOpen(false)} aria-label="홈">
                <Home size={18} />
              </a>
              <a
                className="drawer-quick-link"
                href={isLoggedIn ? "#사용자" : "#로그인"}
                onClick={() => setOpen(false)}
                aria-label={isLoggedIn ? "사용자" : "로그인"}
              >
                <UserRound size={18} />
              </a>
              <a className="drawer-quick-link" href="#장바구니" onClick={() => setOpen(false)} aria-label="장바구니">
                <ShoppingBag size={18} />
              </a>
            </div>
            <button className="icon-button drawer-close" onClick={() => setOpen(false)} aria-label="메뉴 닫기">
              <X size={22} />
            </button>
          </div>
          <div className="drawer-links">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>
                {item}
              </a>
            ))}
          </div>
          <div className="drawer-foot">
            <a href={isLoggedIn ? "#사용자" : "#로그인"} onClick={() => setOpen(false)}>
              {isLoggedIn ? "내 계정 보기" : "로그인하고 쇼핑하기"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];
  const touchStartX = useRef(0);
  const pointerStartX = useRef(0);
  const wheelLock = useRef(false);
  const autoDelay = 5200;

  const showSlide = (direction = 1) => {
    setActive((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => showSlide(1), autoDelay);

    return () => window.clearInterval(timer);
  }, []);

  const handleWheel = (event) => {
    if (Math.abs(event.deltaX) < 36 || Math.abs(event.deltaX) < Math.abs(event.deltaY) || wheelLock.current) return;

    wheelLock.current = true;
    showSlide(event.deltaX > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 650);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX || 0;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 46) {
      showSlide(diff > 0 ? 1 : -1);
    }
  };

  const handlePointerDown = (event) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    const diff = pointerStartX.current - event.clientX;

    if (Math.abs(diff) > 58) {
      showSlide(diff > 0 ? 1 : -1);
    }
  };

  return (
    <section
      className={`hero hero-${slide.tone}`}
      id="top"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="hero-track" aria-hidden="true">
        {heroSlides.map((item, index) => (
          <div key={item.title} className={`hero-slide ${index === active ? "is-active" : ""}`}>
            {item.video ? (
              <video className="hero-art" src={item.video} autoPlay muted loop playsInline />
            ) : (
              <img className="hero-art" src={item.image} alt="" />
            )}
          </div>
        ))}
      </div>
      {slide.tone === "onod" && (
        <div className="hero-editorial">
          <h1>{slide.title}</h1>
          <strong>{slide.subtitle}</strong>
          <p>{slide.body}</p>
        </div>
      )}
      <div className="hero-dots" aria-label="배너 선택">
        {heroSlides.map((item, index) => (
          <button
            key={item.title}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`${item.title} 보기`}
          />
        ))}
      </div>
    </section>
  );
}

function OnodPage() {
  const rituals = [
    {
      number: "01",
      title: "입욕",
      body: "따뜻한 물에 천천히 풀리는 향으로 하루의 긴장을 낮춥니다.",
    },
    {
      number: "02",
      title: "휴식",
      body: "씻는 시간을 넘어, 나를 회복하는 조용한 리듬을 제안합니다.",
    },
    {
      number: "03",
      title: "사우나",
      body: "열과 향, 촉감이 만나는 사우나 루틴을 더 단정하게 완성합니다.",
    },
    {
      number: "04",
      title: "리추얼",
      body: "반복되는 일상 속 작은 의식을 통해 몸과 마음의 온도를 정돈합니다.",
    },
  ];

  return (
    <section className="onod-page" id="오노드">
      <div className="onod-page-head">
        <span>ONOD LETTER</span>
        <h1>물과 열, 향이 머무는 조용한 휴식</h1>
        <p>
          오노드는 입욕과 사우나에서 시작되는 감각을 다룹니다. 씻는 시간을 넘어, 몸과 마음의 온도를
          정돈하는 작은 리추얼을 기록합니다.
        </p>
      </div>
      <figure className="onod-visual">
        <img src={onodSaunaSteam} alt="" />
        <figcaption>Warm water, quiet heat, and the scent that remains.</figcaption>
      </figure>
      <div className="onod-editorial">
        <p>
          따뜻한 물에 티백 한 포를 넣는 일은 아주 작은 동작이지만, 하루의 속도를 바꾸는 시작점이
          됩니다. 향은 천천히 퍼지고, 물은 부드럽게 몸을 감싸며, 생각은 조금씩 느슨해집니다.
        </p>
        <p>
          오노드는 그런 시간을 제품으로만 설명하지 않습니다. 입욕과 사우나, 그리고 휴식 전후의 감각을
          하나의 흐름으로 바라봅니다.
        </p>
      </div>
      <div className="onod-manifesto">
        <h2>몸을 씻는 시간을 넘어, 나를 회복하는 감각을 만듭니다</h2>
        <div className="onod-rituals">
          {rituals.map((ritual) => (
            <article key={ritual.number}>
              <span>{ritual.number}</span>
              <h3>{ritual.title}</h3>
              <p>{ritual.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPage({ initialCategory = "전체" }) {
  const normalizedInitialCategory = shopCategories.includes(initialCategory) ? initialCategory : "전체";
  const [selectedCategory, setSelectedCategory] = useState(normalizedInitialCategory);
  const visibleProducts =
    selectedCategory === "전체"
      ? shopProducts
      : shopProducts.filter((product) => product.line === selectedCategory);

  useEffect(() => {
    setSelectedCategory(normalizedInitialCategory);
  }, [normalizedInitialCategory]);

  return (
    <section className="tab-page product-page" id="제품">
      <div className="tab-page-head">
        <span>ONOD PRODUCT</span>
        <h1>제품</h1>
        <p>카테고리별로 오노드의 입욕, 사우나, 바디, 헤어 제품을 살펴보세요.</p>
      </div>
      <div className="shop-toolbar" aria-label="제품 카테고리">
        <div className="category-filter">
          {shopCategories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "is-active" : ""}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <p>
          {selectedCategory} <span>{visibleProducts.length}</span>
        </p>
      </div>
      <div className="product-page-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={`${product.line}-${product.name}`}
            product={product}
            detailHref={`#제품?category=${encodeURIComponent(product.line)}&product=${encodeURIComponent(product.name)}`}
          />
        ))}
      </div>
    </section>
  );
}

function ProductDetailPage({ productName, onAddToCart }) {
  const selectedProduct = shopProducts.find((product) => product.name === productName) || shopProducts[0];
  const [quantity, setQuantity] = useState(1);
  const [cartNotice, setCartNotice] = useState("");
  const productPrice = parseWon(selectedProduct.price);
  const discountRate = parseWon(selectedProduct.discount);
  const retailPrice = Math.round(productPrice / (1 - discountRate / 100) / 100) * 100;
  const totalPrice = productPrice * quantity;

  useEffect(() => {
    setQuantity(1);
    setCartNotice("");
  }, [selectedProduct.name]);

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => Math.min(20, current + 1));
  const addSelectedProductToCart = () => {
    onAddToCart?.(selectedProduct, quantity);
    setCartNotice("장바구니에 담았습니다.");
    window.setTimeout(() => setCartNotice(""), 1800);
  };

  const buySelectedProduct = () => {
    onAddToCart?.(selectedProduct, quantity);
    window.location.hash = "#장바구니";
  };

  return (
    <section className="tab-page product-page product-detail-page" id="제품">
      <div className="product-purchase">
        <div className="purchase-gallery">
          <div className="purchase-image">
            <img src={productBathTeaSingle} alt={selectedProduct.name} />
          </div>
          <div className="purchase-thumbs" aria-label="상품 이미지">
            {[1, 2, 3].map((item) => (
              <button key={item} className={item === 1 ? "is-active" : ""} type="button">
                <img src={productBathTeaSingle} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="purchase-info">
          <a className="purchase-back" href={`#제품?category=${encodeURIComponent(selectedProduct.line)}`}>
            제품 목록
          </a>
          <div className="purchase-path">ONOD / {selectedProduct.line}</div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.desc || "오노드의 휴식 리추얼을 위한 제품입니다."}</p>
          <div className="purchase-price">
            <span>{selectedProduct.discount}</span>
            <strong>{selectedProduct.price}</strong>
            <del>{formatWon(retailPrice)}</del>
          </div>
          <dl className="purchase-meta">
            <div>
              <dt>배송</dt>
              <dd>국내배송 / 3,000원 (50,000원 이상 무료)</dd>
            </div>
            <div>
              <dt>출고</dt>
              <dd>평일 기준 1-2일 내 순차 출고</dd>
            </div>
            <div>
              <dt>적립</dt>
              <dd>구매금액의 1% 적립</dd>
            </div>
          </dl>
          <label className="purchase-option">
            옵션
            <select key={selectedProduct.name} defaultValue={`${selectedProduct.name} / 기본`}>
              <option>{selectedProduct.name} / 기본</option>
              <option>{selectedProduct.name} / 선물 포장 추가</option>
            </select>
          </label>
          <div className="quantity-row">
            <span>수량</span>
            <div className="quantity-control">
              <button type="button" onClick={decreaseQuantity} aria-label="수량 줄이기">
                -
              </button>
              <output>{quantity}</output>
              <button type="button" onClick={increaseQuantity} aria-label="수량 늘리기">
                +
              </button>
            </div>
          </div>
          <div className="purchase-total">
            <span>총 상품금액</span>
            <strong>{formatWon(totalPrice)}</strong>
          </div>
          <div className="purchase-actions">
            <button className="buy-now" type="button" onClick={buySelectedProduct}>
              바로 구매하기
            </button>
            <button type="button" onClick={addSelectedProductToCart}>
              장바구니
            </button>
            <button type="button">관심상품</button>
          </div>
          {cartNotice && <p className="cart-notice">{cartNotice}</p>}
        </div>
      </div>
      <div className="mobile-buy-bar" aria-label="모바일 구매">
        <div>
          <span>총 상품금액</span>
          <strong>{formatWon(totalPrice)}</strong>
        </div>
        <button type="button" onClick={addSelectedProductToCart}>
          장바구니
        </button>
        <button className="buy-now" type="button" onClick={buySelectedProduct}>
          구매하기
        </button>
      </div>
    </section>
  );
}

function B2BPage() {
  const contactItems = [
    "호텔, 스파, 사우나 어메니티 제안",
    "브랜드 협업 및 선물 세트 구성",
    "공간에 맞춘 향과 입욕 루틴 큐레이션",
  ];

  return (
    <section className="tab-page b2b-page" id="B2B 문의">
      <div className="b2b-layout">
        <div className="b2b-note">
          <span>PARTNERSHIP</span>
          <h2>B2B 문의</h2>
          <ul>
            {contactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <form className="b2b-form">
          <label>
            브랜드 / 업체명
            <input type="text" placeholder="ONOD SPA" />
          </label>
          <label>
            담당자 연락처
            <input type="text" placeholder="name@email.com" />
          </label>
          <label>
            문의 내용
            <textarea placeholder="희망 제품, 수량, 공간 유형을 적어주세요." />
          </label>
          <button type="button">문의 남기기</button>
        </form>
      </div>
    </section>
  );
}

function NewsletterPage() {
  const letterCategories = ["전체", "입욕", "사우나", "리추얼"];
  const [selectedLetterCategory, setSelectedLetterCategory] = useState("전체");
  const letters = [
    {
      number: "01",
      category: "입욕",
      date: "2026.06.17",
      title: "입욕의 시작",
      body: "따뜻한 물에 향이 퍼지는 첫 순간, 하루의 속도는 조금씩 낮아집니다.",
    },
    {
      number: "02",
      category: "사우나",
      date: "2026.06.10",
      title: "사우나의 온도",
      body: "열이 몸을 감싸고 숨이 느려질 때, 휴식은 더 선명한 감각이 됩니다.",
    },
    {
      number: "03",
      category: "리추얼",
      date: "2026.06.03",
      title: "향이 남는 방식",
      body: "강하게 드러나는 향보다 오래 머무는 잔향을 기준으로 제품을 바라봅니다.",
    },
    {
      number: "04",
      category: "입욕",
      date: "2026.05.27",
      title: "하루를 닫는 물의 감각",
      body: "몸을 씻는 일과 마음을 내려놓는 일 사이의 작은 간격을 기록합니다.",
    },
  ];
  const visibleLetters =
    selectedLetterCategory === "전체"
      ? letters
      : letters.filter((letter) => letter.category === selectedLetterCategory);

  return (
    <section className="tab-page newsletter-page" id="뉴스레터">
      <div className="tab-page-head">
        <span>ONOD LETTER</span>
        <h1>뉴스레터</h1>
        <p>입욕과 사우나, 향과 물에 관한 오노드의 짧은 기록을 모았습니다.</p>
      </div>
      <div className="newsletter-toolbar" aria-label="뉴스레터 카테고리">
        <div className="category-filter">
          {letterCategories.map((category) => (
            <button
              key={category}
              className={selectedLetterCategory === category ? "is-active" : ""}
              type="button"
              onClick={() => setSelectedLetterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p>
          {selectedLetterCategory} <span>{visibleLetters.length}</span>
        </p>
      </div>
      <div className="letter-list">
        {visibleLetters.map((letter) => (
          <article key={letter.number}>
            <span>{letter.number}</span>
            <div>
              <small>
                {letter.category} / {letter.date}
              </small>
              <h2>{letter.title}</h2>
            </div>
            <p>{letter.body}</p>
            <a href="#뉴스레터">읽어보기</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function LoginPage({ onLogin, context = "로그인이 필요한 서비스입니다." }) {
  const completeLogin = () => {
    onLogin();
    window.location.hash = "#사용자";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    completeLogin();
  };

  return (
    <section className="tab-page auth-page" id="로그인">
      <div className="auth-panel">
        <span>ONOD MEMBER</span>
        <h1>로그인</h1>
        <p>{context}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            아이디 또는 이메일
            <input type="email" placeholder="email@onod.kr" />
          </label>
          <label>
            비밀번호
            <input type="password" placeholder="비밀번호" />
          </label>
          <button type="submit">로그인</button>
        </form>
        <button className="kakao-login" type="button" onClick={completeLogin}>
          카카오로 시작하기
        </button>
        <div className="login-links">
          <a href="#로그인">아이디 찾기</a>
          <a href="#로그인">비밀번호 찾기</a>
          <a href="#로그인">회원가입</a>
        </div>
      </div>
    </section>
  );
}

function AccountPage({ onLogout }) {
  return (
    <section className="tab-page account-page" id="사용자">
      <div className="account-layout">
        <div className="account-summary">
          <span>MY ONOD</span>
          <h1>사용자</h1>
          <p>오노드 회원님의 주문과 관심상품을 확인할 수 있는 공간입니다.</p>
          <button type="button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
        <div className="account-grid">
          <article>
            <small>ORDER</small>
            <strong>0</strong>
            <p>진행 중인 주문</p>
          </article>
          <article>
            <small>POINT</small>
            <strong>0P</strong>
            <p>사용 가능 적립금</p>
          </article>
          <article>
            <small>WISH</small>
            <strong>0</strong>
            <p>관심상품</p>
          </article>
          <article>
            <small>COUPON</small>
            <strong>0</strong>
            <p>보유 쿠폰</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function CartPage({ isLoggedIn, onLogin, cartItems = [], onUpdateQuantity, onRemoveItem }) {
  if (!isLoggedIn) {
    return <LoginPage onLogin={onLogin} context="장바구니를 확인하려면 먼저 로그인해주세요." />;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + parseWon(item.price) * item.quantity, 0);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return (
    <section className="tab-page cart-page" id="장바구니">
      <div className="cart-head">
        <span>SHOPPING BAG</span>
        <h1>장바구니</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={34} strokeWidth={1.6} />
          <h2>장바구니가 비어 있습니다.</h2>
          <p>마음에 드는 오노드 제품을 담아 휴식의 루틴을 준비해보세요.</p>
          <a href="#제품">제품 보러가기</a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.key} className="cart-item">
                <a
                  className="cart-item-image"
                  href={`#제품?category=${encodeURIComponent(item.line)}&product=${encodeURIComponent(item.name)}`}
                >
                  <img src={productBathTeaSingle} alt={item.name} />
                </a>
                <div className="cart-item-info">
                  <span>{item.line}</span>
                  <h2>
                    <a href={`#제품?category=${encodeURIComponent(item.line)}&product=${encodeURIComponent(item.name)}`}>
                      {item.name}
                    </a>
                  </h2>
                  <strong>{item.price}</strong>
                </div>
                <div className="quantity-control cart-quantity">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity?.(item.key, Math.max(1, item.quantity - 1))}
                    aria-label={`${item.name} 수량 줄이기`}
                  >
                    -
                  </button>
                  <output>{item.quantity}</output>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity?.(item.key, Math.min(20, item.quantity + 1))}
                    aria-label={`${item.name} 수량 늘리기`}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-line-total">{formatWon(parseWon(item.price) * item.quantity)}</strong>
                <button className="cart-remove" type="button" onClick={() => onRemoveItem?.(item.key)}>
                  삭제
                </button>
              </article>
            ))}
          </div>
          <aside className="cart-summary" aria-label="주문 금액">
            <h2>주문 예상 금액</h2>
            <dl>
              <div>
                <dt>상품 금액</dt>
                <dd>{formatWon(subtotal)}</dd>
              </div>
              <div>
                <dt>배송비</dt>
                <dd>{shippingFee === 0 ? "무료" : formatWon(shippingFee)}</dd>
              </div>
              <div>
                <dt>총 결제 예정 금액</dt>
                <dd>{formatWon(total)}</dd>
              </div>
            </dl>
            <p>50,000원 이상 구매 시 무료배송이며, 평일 기준 1-2일 내 순차 출고됩니다.</p>
            <button type="button">주문하기</button>
            <a href="#제품">계속 쇼핑하기</a>
          </aside>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, isSelected = false, detailHref }) {
  const cardHref =
    detailHref || `#제품?category=${encodeURIComponent(product.line)}&product=${encodeURIComponent(product.name)}`;

  return (
    <article className={`product-card ${isSelected ? "is-selected" : ""}`}>
      <div className="product-image-wrap">
        <a className="product-image-link" href={cardHref} aria-label={`${product.name} 상품 상세 보기`}>
          <img src={productBathTeaSingle} alt={product.name} />
        </a>
        <button className="wish-button" aria-label={`${product.name} 찜하기`}>
          <Heart size={22} strokeWidth={2} />
        </button>
        {product.tags?.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <h3>
        <a href={cardHref}>{product.name}</a>
      </h3>
      <p>{product.line}</p>
      <div className="price-row">
        <strong>{product.price}</strong>
        <span>{product.discount}</span>
      </div>
    </article>
  );
}

function BestItems() {
  return (
    <section className="section best-items" id="BEST ITEMS">
      <div className="section-heading best-heading">
        <div>
          <h2>오늘의 입욕과 사우나를 위한 선택</h2>
          <p>배스 티부터 사우나 케어까지, 휴식의 온도를 정돈하는 오노드 추천 제품입니다.</p>
        </div>
        <a href="#제품">전체 제품 보기</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const setDesktopCategoryHover = (category) => {
    if (window.matchMedia("(min-width: 901px)").matches) {
      setHoveredCategory(category);
    }
  };

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".category-card"));
    if (!cards.length) return undefined;
    let frame = 0;
    let settleTimer = 0;

    const markVisibleCards = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isMobile = window.matchMedia("(max-width: 900px)").matches;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const clearTop = viewportHeight * 0.12;
        const clearBottom = viewportHeight * 0.88;
        const cardCenter = rect.top + rect.height / 2;
        const isInClearZone =
          rect.bottom > clearTop && rect.top < clearBottom && cardCenter > clearTop && cardCenter < clearBottom;

        if (isMobile) {
          card.style.removeProperty("--scroll-opacity");
          card.style.removeProperty("--scroll-y");
          card.style.removeProperty("--scroll-scale");
          card.classList.add("is-visible");
          return;
        }

        card.style.removeProperty("--scroll-opacity");
        card.style.removeProperty("--scroll-y");
        card.style.removeProperty("--scroll-scale");
        card.classList.toggle("is-visible", isInClearZone);
      });
    };

    const queueVisibleCardCheck = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        markVisibleCards();
      });

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(markVisibleCards, 90);
    };

    markVisibleCards();
    window.addEventListener("scroll", queueVisibleCardCheck, { passive: true });
    window.addEventListener("resize", queueVisibleCardCheck);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", queueVisibleCardCheck);
      window.removeEventListener("resize", queueVisibleCardCheck);
    };
  }, []);

  return (
    <section className="section feature" id="제품">
      <div className={`category-grid ${hoveredCategory ? "has-focus" : ""}`}>
        {categories.map((category, index) => (
          <article
            key={category.title}
            className={`category-card ${category.size || ""} ${
              hoveredCategory === category.title ? "is-active" : hoveredCategory ? "is-muted" : ""
            }`}
            onMouseEnter={() => setDesktopCategoryHover(category.title)}
            onMouseLeave={() => setHoveredCategory(null)}
            onFocus={() => setDesktopCategoryHover(category.title)}
            onBlur={() => setHoveredCategory(null)}
          >
            <img src={category.image} alt="" />
            <div className="category-copy">
              <span className="category-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{category.title}</h2>
              <p>{category.body}</p>
              <a href={`#제품?category=${encodeURIComponent(categoryProductMap[category.title] || "전체")}`}>
                제품 더보기
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Therapy() {
  return (
    <section className="therapy">
      <img src={therapyBg} alt="" />
      <div className="therapy-copy">
        <h2>ONOD BATH REST SAUNA RITUAL</h2>
        <p>
          오노드는 입욕과 사우나에서 시작되는{"\n"}
          깊은 휴식을 제안합니다.{"\n\n"}
          따뜻한 물과 은은한 향으로{"\n"}
          몸과 마음을 편안하게 정돈합니다.{"\n\n"}
          씻는 시간을 넘어,{"\n"}
          나를 회복하는 조용한 휴식의 순간을 만듭니다.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a href="#소개">오노드 소개</a>
        <a href="#제품">제품</a>
        <a href="#문의하기">문의하기</a>
      </div>
      <div>
        <a href="#로그인">로그인</a>
        <a href="#사용자">마이쇼핑</a>
        <a href="#장바구니">장바구니</a>
      </div>
      <p>
        Copyright ©ONOD. All Rights Reserved.
        <br />
        꼬르메꾸시주식회사 | 대표 송한나 | 02-2205-3568 | shop@pibupibu.co.kr
      </p>
    </footer>
  );
}

export function App() {
  const [hash, setHash] = useState(() => decodeURIComponent(window.location.hash || "#top"));
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.localStorage.getItem("onod-auth") === "true");
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const routeHash = hash.split("?")[0];
  const routeParams = new URLSearchParams(hash.split("?")[1] || "");
  const selectedProductCategory = routeParams.get("category") || "전체";
  const selectedProductName = routeParams.get("product") || "";
  const standaloneRoutes = ["#오노드", "#제품", "#B2B 문의", "#뉴스레터", "#로그인", "#사용자", "#마이쇼핑", "#장바구니"];
  const standalonePage = standaloneRoutes.includes(routeHash) ? routeHash : null;

  const handleLogin = () => {
    window.localStorage.setItem("onod-auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("onod-auth");
    setIsLoggedIn(false);
    window.location.hash = "#로그인";
  };

  const persistCart = (nextCart) => {
    setCartItems(nextCart);
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
  };

  const handleAddToCart = (product, quantity = 1) => {
    const productKey = getProductKey(product);
    const nextCart = [...cartItems];
    const existingIndex = nextCart.findIndex((item) => item.key === productKey);

    if (existingIndex >= 0) {
      nextCart[existingIndex] = {
        ...nextCart[existingIndex],
        quantity: Math.min(20, nextCart[existingIndex].quantity + quantity),
      };
    } else {
      nextCart.push({
        key: productKey,
        name: product.name,
        line: product.line,
        price: product.price,
        discount: product.discount,
        quantity,
      });
    }

    persistCart(nextCart);
  };

  const handleUpdateCartQuantity = (key, quantity) => {
    persistCart(cartItems.map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const handleRemoveCartItem = (key) => {
    persistCart(cartItems.filter((item) => item.key !== key));
  };

  useEffect(() => {
    const syncHash = () => setHash(decodeURIComponent(window.location.hash || "#top"));

    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useLayoutEffect(() => {
    const setScrollTop = (top) => {
      window.scrollTo(0, top);

      const scroller = document.scrollingElement || document.documentElement;
      scroller.scrollTop = top;
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    };

    const jumpToTop = () => {
      setScrollTop(0);
    };

    if (standalonePage) {
      jumpToTop();
      window.setTimeout(jumpToTop, 0);
      return;
    }

    if (hash === "#top") {
      jumpToTop();
      window.setTimeout(jumpToTop, 0);
      return;
    }

    const jumpToHashTarget = () => {
      const target = document.getElementById(routeHash.replace("#", ""));

      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY;
      setScrollTop(top);
    };

    window.requestAnimationFrame(() => {
      jumpToHashTarget();
      window.setTimeout(jumpToHashTarget, 0);
      window.setTimeout(jumpToHashTarget, 80);
    });
  }, [hash, routeHash, standalonePage]);

  const renderStandalonePage = () => {
    if (standalonePage === "#오노드") return <OnodPage />;
    if (standalonePage === "#제품" && selectedProductName) {
      return <ProductDetailPage productName={selectedProductName} onAddToCart={handleAddToCart} />;
    }
    if (standalonePage === "#제품") return <ProductPage initialCategory={selectedProductCategory} />;
    if (standalonePage === "#B2B 문의") return <B2BPage />;
    if (standalonePage === "#뉴스레터") return <NewsletterPage />;
    if (standalonePage === "#로그인") {
      return isLoggedIn ? <AccountPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />;
    }
    if (standalonePage === "#사용자" || standalonePage === "#마이쇼핑") {
      return isLoggedIn ? (
        <AccountPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} context="사용자 페이지를 확인하려면 먼저 로그인해주세요." />
      );
    }
    if (standalonePage === "#장바구니") {
      return (
        <CartPage
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
        />
      );
    }

    return null;
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {standalonePage ? (
        <main>
          {renderStandalonePage()}
        </main>
      ) : (
        <main>
          <Hero />
          <BestItems />
          <Categories />
          <Therapy />
        </main>
      )}
      <Footer />
    </>
  );
}
