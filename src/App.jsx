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
import categoryHairOnod from "./assets/category-hair-onod.png";
import categoryBody from "./assets/category-body.jpg";
import categoryBodyOnod from "./assets/category-body-onod.png";
import categoryBathOnsen from "./assets/category-bath-onsen.png";
import categorySaunaStones from "./assets/category-sauna-stones.png";
import therapySaunaRitual from "./assets/therapy-sauna-ritual.png";
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

const homeProducts = [
  shopProducts.find((product) => product.name === "유케무리 기소 히노키 배스 티"),
  shopProducts.find((product) => product.name === "오노드 사우나 울 캡"),
  shopProducts.find((product) => product.name === "오노드 사우나 아로마 타월 미스트"),
  shopProducts.find((product) => product.name === "오노드 두피 샴푸"),
].filter(Boolean);

const CART_STORAGE_KEY = "onod-cart";
const READY_PRODUCT_NAME = "유케무리 기소 히노키 배스 티";

const getProductKey = (product) => `${product.line}::${product.name}`;

function ProductVisual({ product, productName, alt = "" }) {
  const name = product?.name || productName || alt;

  if (name === READY_PRODUCT_NAME) {
    return <img src={productBathTeaSingle} alt={alt || name} />;
  }

  return (
    <div className="product-ready-image" role="img" aria-label={`${name} 이미지 준비중`}>
      <span>준비중</span>
    </div>
  );
}

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
    image: categoryBodyOnod,
  },
  {
    title: "HAIR",
    body: "린스 없이도 부드럽고 건강하게 감기는 헤어케어",
    image: categoryHairOnod,
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
                    <ProductVisual product={product} alt="" />
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
            <ProductVisual product={selectedProduct} alt={selectedProduct.name} />
          </div>
          <div className="purchase-thumbs" aria-label="상품 이미지">
            {[1, 2, 3].map((item) => (
              <button key={item} className={item === 1 ? "is-active" : ""} type="button">
                <ProductVisual product={selectedProduct} alt="" />
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
      <div className="detail-tabs" aria-label="상품 상세 메뉴">
        <button type="button">상세정보</button>
        <button type="button">구매안내</button>
        <button type="button">리뷰</button>
        <button type="button">문의</button>
      </div>
      <div className="product-detail-shell" id="product-detail">
        <div className="detail-placeholder">
          <strong>상세페이지 삽입 영역</strong>
          <small>제품별 상세페이지 이미지와 콘텐츠를 이 위치에 추가할 수 있습니다.</small>
        </div>
        <div className="detail-guide-list">
          <details open>
            <summary>주의사항</summary>
            <p>
              피부에 이상이 있을 경우 사용을 중단하고 전문의와 상담해주세요. 직사광선을 피해 서늘한 곳에 보관하고,
              영유아의 손이 닿지 않는 곳에 두세요.
            </p>
          </details>
          <details>
            <summary>배송 안내</summary>
            <p>기본 배송비는 3,000원이며 50,000원 이상 구매 시 무료배송입니다. 평일 오후 2시 이전 주문은 순차 출고됩니다.</p>
          </details>
          <details>
            <summary>교환 / 반품 안내</summary>
            <p>상품 수령 후 7일 이내 미개봉 상품에 한해 접수 가능합니다. 단순 변심 반품 배송비는 고객 부담입니다.</p>
          </details>
          <details>
            <summary>CS 문의</summary>
            <p>평일 10:00-17:00 / shop@onod.kr 로 문의를 남겨주시면 순차적으로 답변드립니다.</p>
          </details>
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

const newsletterLetters = [
  {
    number: "01",
    category: "입욕",
    date: "2026.06.22",
    title: "물에 잠기는 동안, 몸은 조용히 나를 돌본다",
    body: "입욕이라는 가장 익숙한 습관을, 혈류와 체온의 관점에서 다시 들여다봅니다.",
    intro:
      "하루를 끝내고 따뜻한 물에 몸을 담그는 순간, 우리는 보통 피곤이 풀린다고 말합니다. 그런데 그 몇 분 동안 욕조 안에서 일어나는 일은 생각보다 훨씬 분주합니다.",
    sections: [
      {
        heading: "20년, 3만 명이 남긴 데이터",
        paragraphs: [
          "가장 자주 인용되는 연구는 일본에서 나왔습니다. 연구진은 심혈관질환이나 암 병력이 없는 40~59세 성인 30,076명을 1990년부터 2009년까지, 약 20년간 추적했습니다. 입욕 빈도를 주 0~2회, 주 3~4회, 거의 매일로 나누고 운동, 식습관, 음주, 수면, 체중 같은 요인을 보정한 뒤 심혈관질환 발생을 살펴봤죠.",
          "결과는 2020년 의학저널 Heart에 실렸습니다. 거의 매일 욕조에 몸을 담근 사람들은 입욕을 거의 하지 않거나 주 1~2회에 그친 사람들보다 심혈관질환 전체 위험이 약 28%, 뇌졸중 위험이 약 26% 낮은 것으로 나타났습니다.",
          "이런 연구는 관찰연구라서 입욕이 직접 심장을 지켰다고 단정하기는 어렵습니다. 다만 수만 명을 수십 년 지켜본 데이터에서 일관된 방향성이 보인다는 건 분명히 의미가 있습니다.",
        ],
      },
      {
        heading: "욕조 안에서, 혈관에 일어나는 일",
        paragraphs: [
          "따뜻한 물의 핵심은 열과 체온입니다. 체온이 올라가면 몸은 열을 내보내기 위해 피부 가까운 혈관을 넓힙니다. 혈관이 넓어지면 혈액이 흐를 때 받는 저항이 줄고, 혈류가 빨라집니다.",
          "이 과정에서 혈관 안쪽 벽은 산화질소라는 물질을 더 많이 내보내는데, 산화질소는 혈관을 부드럽게 이완시켜 혈압을 낮추고 혈관 건강을 돕는 역할을 합니다.",
          "연구자들은 이런 반응을 수동적 가열, 혹은 가만히 누워서 받는 심혈관 컨디셔닝이라고 부릅니다. 운동이 어려운 날에도 꺼내 쓸 수 있는, 문턱이 아주 낮은 선택지라는 점은 분명합니다.",
        ],
      },
      {
        heading: "사우나보다 욕조라는 최근의 반전",
        paragraphs: [
          "2025년 오리건대 연구진은 건강한 젊은 성인 20명을 대상으로 온수 입욕, 전통 사우나, 원적외선 사우나 세 가지를 같은 조건에서 비교했습니다. 그 결과 심부체온을 가장 많이 끌어올린 건 다름 아닌 온수 입욕이었습니다.",
          "사우나에서는 땀을 흘려 몸을 식힐 수 있지만, 물속에 잠겨 있으면 그 냉각 기능이 잘 작동하지 않습니다. 그래서 같은 시간이라도 물에 몸을 담그면 체온이 더 깊이 올라가고, 혈류와 면역 반응 같은 후속 변화도 더 크게 따라온다는 설명입니다.",
        ],
      },
      {
        heading: "그래서, 어떻게 하면 좋을까",
        paragraphs: [
          "물은 너무 뜨겁지 않게, 38~40도 정도의 기분 좋게 따뜻한 정도가 좋습니다. 한 번에 10~15분 전후로도 충분하고, 오래 버티기보다 무리 없이 반복하는 편이 낫습니다.",
          "다만 따뜻한 물이 누구에게나 무조건 안전한 건 아닙니다. 물이 지나치게 뜨겁거나 입욕 시간이 길면 혈압이 급격히 변할 수 있습니다. 심혈관 질환이 있거나, 고령이거나, 음주 후라면 특히 물 온도를 낮추고 시간을 짧게 가져가는 것이 좋습니다.",
        ],
      },
      {
        heading: "오노드의 관점",
        paragraphs: [
          "입욕의 효과가 빈도에서 나온다는 사실은, 저희가 입욕제를 만들 때 가장 자주 떠올리는 문장이기도 합니다. 아무리 좋은 습관도 매일 손이 가지 않으면 데이터가 되지 않으니까요.",
          "그래서 오노드는 오늘도 욕조에 들어가고 싶게 만드는 경험을 먼저 생각합니다. 물에 풀리는 순간의 향, 피부에 닿는 감촉, 그리고 나온 뒤에도 남는 잔잔한 여운까지. 효능을 약속하기보다 매일 반복할 이유를 하나 더 얹는 쪽이 결국 더 정직한 웰니스라고 믿기 때문입니다.",
        ],
      },
    ],
    closing: "오늘 밤, 너무 뜨겁지 않은 물 한 욕조. 혈관이 알아서 일하는 동안, 당신은 그저 따뜻하면 됩니다.",
    references: [
      "Ukai T, Iso H, Yamagishi K, et al. Habitual tub bathing and risks of incident coronary heart disease and stroke. Heart. 2020;106(10):732-737.",
      "Kohara K, Tabara Y, Ochi M, et al. Habitual hot water bathing protects cardiovascular function in middle-aged to elderly Japanese subjects. Scientific Reports. 2018;8:8687.",
      "University of Oregon, Bowerman Sports Science Center 연구(2025), American Journal of Physiology-Regulatory, Integrative and Comparative Physiology.",
    ],
  },
  {
    number: "02",
    category: "입욕",
    date: "2026.06.15",
    title: "잠은, 따뜻해진 몸이 식어갈 때 찾아온다",
    body: "잠들기 전 입욕이 수면을 부르는 방식은 몸을 데우는 것보다 식어가는 곡선에 있습니다.",
    intro:
      "잘 자고 싶은 밤일수록 잠은 더 멀리 달아납니다. 따뜻한 물은 우리가 잠드는 방식과 깊이 연결되어 있고, 그 원리는 몸을 데우는 것이 아니라 몸을 식히는 것에 있습니다.",
    sections: [
      {
        heading: "따뜻한 물이 잠을 앞당긴다는 증거",
        paragraphs: [
          "미국 텍사스대 연구진은 잠들기 전 따뜻한 물에 몸을 데우는 것과 수면의 관계를 다룬 기존 연구들을 모아 분석했습니다. 5,000편이 넘는 후보 논문을 추리고, 조건이 맞는 17편을 골라 종합한 메타분석이었습니다.",
          "약 40~42.5도의 물에 10분 정도, 잠자리에 들기 1~2시간 전에 몸을 담그거나 샤워를 하면 잠드는 데 걸리는 시간이 평균 약 36% 짧아지고 수면의 질도 좋아지는 경향이 나타났습니다.",
        ],
      },
      {
        heading: "데웠다가 식는 그 곡선이, 잠의 신호",
        paragraphs: [
          "우리 몸은 잠들 시간이 가까워지면 스스로 심부체온을 조금 떨어뜨립니다. 이 체온의 하강 곡선이 곧 뇌에게 보내는 이제 잘 시간이라는 신호입니다.",
          "따뜻한 물은 이 과정을 거들어 줍니다. 물에 몸을 담그면 손과 발의 혈관이 넓어지면서 피부 표면으로 피가 몰리고, 그 길을 통해 몸 안쪽의 열이 바깥으로 빠져나갑니다.",
          "잠들기 90분 전이 좋은 이유도 이것입니다. 그쯤 입욕을 마쳐야 체온이 충분히 내려가는 시점과 실제 잠자리에 드는 시점이 자연스럽게 겹칩니다.",
        ],
      },
      {
        heading: "욕조가 없어도 괜찮습니다",
        paragraphs: [
          "전신 입욕이 어려운 날도 있습니다. 다행히 연구들은 발만 담그는 족욕에서도 비슷한 방향의 효과를 보고합니다. 특히 고령자를 대상으로 한 연구에서는 35~40도 정도의 비교적 미지근한 족욕만으로도 잠드는 데 도움이 됐습니다.",
          "비교적 최근인 2025년에는 지역사회에 거주하는 노년층이 잠들기 전 욕조에 몸을 담그는 습관을 실제 생활 속에서 관찰한 연구도 나왔습니다. 이 연구에서도 취침 전 입욕은 더 높은 수면 효율, 그리고 잠든 뒤 깨어 있는 시간이 짧아지는 것과 연관됐습니다.",
        ],
      },
      {
        heading: "그래서, 오늘 밤엔 이렇게",
        paragraphs: [
          "물은 38~42도 정도로 기분 좋게 따뜻하게, 시간은 10~15분이면 충분합니다. 가장 중요한 건 시점입니다. 잠자리에 들기 1~2시간 전, 넉넉잡아 90분 전쯤 마치는 것이 좋습니다.",
          "입욕 직후 곧바로 눕는 것보다, 몸이 서서히 식어가는 여유를 두는 편이 효과적입니다. 입욕 후 조명을 낮추고 휴대폰을 멀리 두면, 체온이 그리는 하강 곡선을 빛과 자극이 방해하지 않습니다.",
        ],
      },
      {
        heading: "오노드의 관점",
        paragraphs: [
          "잠을 위한 입욕에서 가장 중요한 건 결국 마음이 풀리는 90분을 만드는 일입니다. 그래서 오노드는 잠 앞에 두는 입욕을, 하루를 끝맺는 하나의 의식처럼 생각합니다.",
          "물에 천천히 번지는 향, 욕실의 온기, 그리고 욕조에서 나와 몸이 식어가는 동안에도 은은하게 남는 잔향까지. 그 감각들이 모여 이제 잘 시간이라는 신호를 몸보다 먼저 마음에 새겨 줍니다.",
        ],
      },
    ],
    closing: "오늘 밤, 잠들기 조금 일찍. 따뜻한 물에서 나온 뒤 천천히 식어가는 그 시간을 잠을 향한 준비로 남겨 두세요.",
    references: [
      "Haghayegh S, Khoshnevis S, Smolensky MH, et al. Before-bedtime passive body heating by warm shower or bath to improve sleep. Sleep Medicine Reviews. 2019;46:124-135.",
      "The University of Texas at Austin, Cockrell School of Engineering 보도자료(2019).",
      "Association between before-bedtime hot-tub bathing and sleep quality in real-life settings among community-dwelling older adults. Sleep Health. 2025.",
    ],
  },
  {
    number: "03",
    category: "사우나",
    date: "2026.06.08",
    title: "핀란드 사람들이 거의 매일 들어가는 그 방",
    body: "사우나가 단순한 휴식을 넘어 하나의 생활 습관이 되었을 때 몸에 남기는 변화를 살펴봅니다.",
    intro:
      "인구 550만 명의 핀란드에는 사우나가 약 300만 개 있다고 합니다. 그들에게 사우나는 특별한 호사가 아니라, 밥을 먹고 잠을 자는 것처럼 하루에 스며든 습관입니다.",
    sections: [
      {
        heading: "20년을 따라간 핀란드의 데이터",
        paragraphs: [
          "가장 유명한 연구는 핀란드 동부에서 진행됐습니다. 연구진은 42~60세 중년 남성 2,315명을, 사우나 습관을 기록한 채 약 20년간 지켜봤습니다.",
          "주 1회 사우나를 하는 사람과 주 4~7회 하는 사람을 비교한 결과, 자주 사우나를 한 그룹은 주 1회 그룹에 비해 전체 사망 위험이 약 40% 낮았고, 급성 심장사 위험은 63%, 치명적 심혈관질환 위험은 50% 낮은 것으로 나타났습니다.",
          "같은 연구진의 후속 분석에서는 주 4~7회 사우나를 한 사람들의 치매와 알츠하이머병 위험이 각각 약 66%, 65% 낮은 것으로 보고됐고, 다른 분석에서는 뇌졸중 위험 감소와도 연관됐습니다.",
        ],
      },
      {
        heading: "뜨거운 방 안에서, 몸에 일어나는 일",
        paragraphs: [
          "전형적인 핀란드 사우나는 머리 높이 기준 80~100도에 습도는 10~20% 정도로 낮은 건식 열입니다. 이 짧은 시간 동안 몸은 꽤 많은 일을 합니다.",
          "높은 열에 노출되면 심장은 더 빨리 뛰고 혈관은 넓어집니다. 반복적으로 이 자극을 받으면 혈관 안쪽 벽의 기능이 좋아지고, 동맥의 경직도가 줄며, 긴장과 이완을 조절하는 자율신경의 균형도 개선되는 방향으로 움직입니다.",
        ],
      },
      {
        heading: "숫자만큼 중요한, 사우나라는 시간",
        paragraphs: [
          "이 연구들은 대부분 관찰연구라서 사우나가 직접 수명을 늘렸다고 단정하기는 어렵습니다. 실제로 일부 학자들은 사우나를 자주 할 만큼 건강한 사람이었던 것 아니냐는 반론을 제기하기도 했습니다.",
          "핀란드 연구자들은 사우나의 효과를 열에서만 찾지 않았습니다. 사우나는 오래도록 가족과 친구가 모이는 공간이었고, 그 안에서는 언쟁이나 험담을 삼가는 문화가 있다고 합니다. 몸을 데우는 동시에 마음을 식히는 시간이기도 했던 것이죠.",
        ],
      },
      {
        heading: "사우나를 건강하게 즐기려면",
        paragraphs: [
          "핀란드의 방식은 의외로 소박합니다. 무리하지 않는 온도에서 5~20분 정도, 끝나면 충분히 식히고 수분을 보충하는 것. 길게 버티는 것보다 편안한 선에서 반복하는 편이 낫습니다.",
          "불안정한 협심증이 있거나 최근 심장에 문제가 있었던 분, 임신 중이거나 음주 상태라면 주의가 필요합니다. 어지럽거나 가슴이 답답하면 즉시 나와서 시원한 곳에서 쉬고, 들어가기 전후로 물을 충분히 마시는 것이 좋습니다.",
        ],
      },
      {
        heading: "오노드의 관점",
        paragraphs: [
          "사우나가 우리 몸에 남기는 또 하나의 흔적은 빠르게 빠져나간 수분과 유분입니다. 땀을 흘린 피부와 두피는 그만큼 갈증을 느끼죠.",
          "그래서 오노드는 사우나를 끝나는 순간이 아니라 이어지는 케어까지가 한 세트라고 생각합니다. 데우고, 비우고, 다시 채우는 일. 오노드가 사우나 곁에 두고 싶은 것은 바로 그 마무리의 감각입니다.",
        ],
      },
    ],
    closing: "뜨거운 방에서 마음을 비우는 시간, 그리고 나와서 잃어버린 것을 다시 채워 주는 시간까지 사우나는 하나의 완성된 리추얼이 됩니다.",
    references: [
      "Laukkanen T, Khan H, Zaccardi F, Laukkanen JA. Association between sauna bathing and fatal cardiovascular and all-cause mortality events. JAMA Internal Medicine. 2015;175(4):542-548.",
      "Laukkanen T, Kunutsor S, Kauhanen J, Laukkanen JA. Sauna bathing is inversely associated with dementia and Alzheimer's disease in middle-aged Finnish men. Age and Ageing. 2017;46(2):245-249.",
      "Laukkanen JA, Laukkanen T, Kunutsor SK. Cardiovascular and Other Health Benefits of Sauna Bathing: A Review of the Evidence. Mayo Clinic Proceedings. 2018;93(8):1111-1121.",
    ],
  },
  {
    number: "04",
    category: "리추얼",
    date: "2026.06.01",
    title: "향은 코가 아니라, 마음에 먼저 닿는다",
    body: "입욕과 사우나의 시간을 감싸는 향이 감정과 기억에 닿는 방식을 이야기합니다.",
    intro:
      "어떤 냄새를 맡는 순간 오래전 어느 날로 훅 끌려간 적이 있을 겁니다. 향은 이상하리만치 감정과 기억에 곧장 닿습니다. 이건 단순한 인상이 아니라, 우리 뇌가 실제로 그렇게 설계되어 있기 때문입니다.",
    sections: [
      {
        heading: "향이 감정에 닿는 가장 짧은 길",
        paragraphs: [
          "우리가 어떤 냄새를 맡으면, 그 신호는 코 안쪽의 후각 신경을 거쳐 뇌의 변연계로 전달됩니다. 변연계는 감정과 기억을 다루는 영역으로, 그 안에는 두려움과 정서를 관장하는 편도체, 기억을 담당하는 해마가 자리합니다.",
          "향이 유독 감정과 기억을 잘 흔드는 이유가 여기에 있습니다. 시각이나 청각과 달리, 후각은 감정의 중심부와 거의 곧장 연결되어 있거든요.",
        ],
      },
      {
        heading: "연구가 들여다본 이완의 흔적",
        paragraphs: [
          "향과 이완의 관계를 가장 많이 연구한 소재 중 하나는 라벤더입니다. 라벤더 향의 주요 성분인 리날룰과 리날릴 아세테이트가 후각을 통해 변연계에 작용하는 것으로 알려져 있습니다.",
          "여러 연구를 종합한 분석들은 라벤더 향이 불안을 낮추고 이완을 돕는 경향과 연관된다고 보고합니다. 몸의 반응을 측정한 연구들에서는 라벤더 향을 맡았을 때 긴장 상태에서 올라가는 교감신경 관련 지표가 줄어드는 것이 관찰됐습니다.",
        ],
      },
      {
        heading: "향은 만병통치가 아니라, 반복되는 신호다",
        paragraphs: [
          "향의 효과가 모든 연구에서 한결같이 나타난 건 아닙니다. 고스트레스 상황에서는 라벤더 향이 코르티솔을 낮췄다는 보고가 있는 반면, 스트레스가 크지 않은 건강한 사람에게서는 뚜렷한 변화가 없던 연구도 있습니다.",
          "오히려 향의 진짜 힘은 같은 향을 반복하는 행위가 만들어 내는 신호에 있습니다. 매일 밤 같은 향과 함께 하루를 닫으면, 뇌는 그 향을 이제 긴장을 풀어도 되는 시간과 연결 짓기 시작합니다.",
        ],
      },
      {
        heading: "향을 리추얼로 만드는 법",
        paragraphs: [
          "향을 잘 쓰는 방법은 의외로 단순합니다. 좋은 향을 가끔 사치처럼 쓰기보다, 마음에 드는 한 가지 향을 정해 매일 같은 순간에 반복하는 것입니다.",
          "입욕할 때, 사우나에서 나와 몸을 정돈할 때, 잠들기 전 머리맡에서. 늘 같은 자리에 같은 향을 두면, 그 향은 점점 전환의 표지가 됩니다.",
        ],
      },
      {
        heading: "오노드의 관점",
        paragraphs: [
          "돌아보면 입욕도, 사우나도, 결국 그 시간을 감싸던 향과 함께 기억됩니다. 오노드가 입욕제부터 바디와 헤어 제품까지 향의 결을 신중하게 잇는 이유도 여기에 있습니다.",
          "좋은 향은 욕실에 머무는 동안 끝나지 않습니다. 몸에, 머리카락에, 그리고 하루의 끝자락에 은은히 남아 다음의 고요를 예고합니다. 웰니스는 거창한 결심이 아니라 매일의 익숙한 감각이 됩니다.",
        ],
      },
    ],
    closing: "오늘 밤, 당신만의 향 하나를 정해 보세요. 그리고 매일 같은 순간에 그 향을 켜 두세요.",
    references: [
      "후각 신호가 후각구를 거쳐 변연계로 전달되며 라벤더의 리날룰, 리날릴 아세테이트가 이 경로를 통해 작용한다고 보는 아로마테라피 기전 문헌.",
      "라벤더 아로마테라피가 불안 감소, 이완과 연관된다는 체계적 문헌고찰 및 메타분석. Lillehei AS, Halcon LL. J Altern Complement Med. 2015 등.",
      "개심술을 앞둔 환자를 대상으로 라벤더 향 흡입이 불안과 혈중 코르티솔 수치 감소와 연관됐다는 임상시험.",
    ],
  },
];

function NewsletterPage() {
  const letterCategories = ["전체", "입욕", "사우나", "리추얼"];
  const [selectedLetterCategory, setSelectedLetterCategory] = useState("전체");
  const visibleLetters =
    selectedLetterCategory === "전체"
      ? newsletterLetters
      : newsletterLetters.filter((letter) => letter.category === selectedLetterCategory);

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
            <a href={`#뉴스레터?letter=${letter.number}`}>읽어보기</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsletterDetailPage({ letterNumber }) {
  const letter = newsletterLetters.find((item) => item.number === letterNumber) || newsletterLetters[0];

  return (
    <article className="tab-page newsletter-detail-page" id="뉴스레터">
      <div className="newsletter-detail">
        <a className="letter-back" href="#뉴스레터">
          목록으로
        </a>
        <div className="letter-meta">
          <span>{letter.number}</span>
          <small>
            {letter.category} / {letter.date}
          </small>
        </div>
        <h1>{letter.title}</h1>
        <p className="letter-intro">{letter.intro}</p>
        <div className="letter-body">
          {letter.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
        <blockquote>{letter.closing}</blockquote>
        <section className="letter-references">
          <h2>참고한 연구</h2>
          <ol>
            {letter.references.map((reference) => (
              <li key={reference}>{reference}</li>
            ))}
          </ol>
          <p>본 콘텐츠는 건강 정보를 일반적으로 소개하기 위한 글이며, 의학적 진단이나 치료를 대신하지 않습니다.</p>
        </section>
        <nav className="letter-nav" aria-label="뉴스레터 이동">
          {newsletterLetters.map((item) => (
            <a key={item.number} className={item.number === letter.number ? "is-active" : ""} href={`#뉴스레터?letter=${item.number}`}>
              {item.number}
            </a>
          ))}
        </nav>
      </div>
    </article>
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
                  <ProductVisual productName={item.name} alt={item.name} />
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
          <ProductVisual product={product} alt={product.name} />
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
        {homeProducts.map((product) => (
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

function HomeNewsletter() {
  const featuredLetters = newsletterLetters.slice(0, 3);

  return (
    <section className="section home-newsletter" id="ONOD LETTER">
      <div className="home-newsletter-head">
        <div>
          <h2>휴식의 감각을 짧게 기록합니다.</h2>
          <p>입욕과 사우나, 물과 향에 관한 오노드의 뉴스레터를 홈에서도 가볍게 만나보세요.</p>
        </div>
        <a href="#뉴스레터">뉴스레터 보기</a>
      </div>
      <div className="home-letter-grid">
        {featuredLetters.map((letter) => (
          <a key={letter.number} href={`#뉴스레터?letter=${letter.number}`}>
            <h3>{letter.title}</h3>
            <p>{letter.body}</p>
            <span>읽어보기</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Therapy() {
  return (
    <section className="therapy">
      <img src={therapySaunaRitual} alt="" />
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
        온리브 | 대표 권영찬 | 010-3575-2986 | shop@onod.kr
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
  const selectedLetterNumber = routeParams.get("letter") || "";
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
    if (standalonePage === "#뉴스레터" && selectedLetterNumber) {
      return <NewsletterDetailPage letterNumber={selectedLetterNumber} />;
    }
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
          <HomeNewsletter />
          <Therapy />
        </main>
      )}
      <Footer />
    </>
  );
}
