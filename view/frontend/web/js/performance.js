/* https://github.com/micmro/performance-bookmarklet by Michael Mrowetz @MicMro
   build:25/06/2016 */
! function a(b, c, d) {
    function e(g, h) { if (!c[g]) { if (!b[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); var j = new Error("Cannot find module '" + g + "'"); throw j.code = "MODULE_NOT_FOUND", j } var k = c[g] = { exports: {} };
            b[g][0].call(k.exports, function(a) { var c = b[g][1][a]; return e(c ? c : a) }, k, k.exports, a, b, c, d) } return c[g].exports } for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]); return e }({
    1: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = (c(a("../data")), c(a("../helpers/helpers")), c(a("../helpers/dom"))),
            e = (c(a("../helpers/waterfall")), {}),
            f = function(a, b, c) { var e = d.newTag("div", { "class": "legend-holder" });
                e.appendChild(d.newTag("h4", { text: b })); var f = d.newTag("dl", { "class": "legend " + a }); return c.forEach(function(a) { f.appendChild(d.newTag("dt", { "class": "colorBoxHolder", childElement: d.newTag("span", {}, "background:" + a[1]) })), f.appendChild(d.newTag("dd", { text: a[0] })) }), e.appendChild(f), e };
        e.init = function() { var a = d.newTag("section", { "class": "resource-timing chart-holder" });
            a.appendChild(d.newTag("h3", { text: "Legend" })); var b = d.newTag("div", { "class": "legends-group " }); return b.appendChild(f("initiator-type-legend", "Block color: Initiator Type", [
                ["css", "#afd899"],
                ["iframe", "#85b3f2"],
                ["img", "#bc9dd6"],
                ["script", "#e7bd8c"],
                ["link", "#89afe6"],
                ["swf", "#4db3ba"],
                ["xmlhttprequest", "#e7d98c"]
            ])), b.appendChild(f("navigation-legend", "Navigation Timing", [
                ["Redirect", "#ffff60"],
                ["App Cache", "#1f831f"],
                ["DNS Lookup", "#1f7c83"],
                ["TCP", "#e58226"],
                ["SSL Negotiation", "#c141cd"],
                ["Time to First Byte", "#1fe11f"],
                ["Content Download", "#1977dd"],
                ["DOM Processing", "#9cc"],
                ["DOM Content Loaded", "#d888df"],
                ["On Load", "#c0c0ff"]
            ])), b.appendChild(f("resource-legend", "Resource Timing", [
                ["Stalled/Blocking", "#cdcdcd"],
                ["Redirect", "#ffff60"],
                ["App Cache", "#1f831f"],
                ["DNS Lookup", "#1f7c83"],
                ["TCP", "#e58226"],
                ["SSL Negotiation", "#c141cd"],
                ["Initial Connection (TCP)", "#e58226"],
                ["Time to First Byte", "#1fe11f"],
                ["Content Download", "#1977dd"]
            ])), a.appendChild(b), a }, b.exports = e }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10, "../helpers/waterfall": 17 }],
    2: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../data")),
            e = (c(a("../helpers/helpers")), c(a("../helpers/svg")), c(a("../helpers/dom")), c(a("../helpers/tableLogger"))),
            f = c(a("../helpers/waterfall")),
            g = {};
        g.init = function() { var a = d.perfTiming.navigationStart,
                b = { pageLoadTime: d.perfTiming.loadEventEnd - d.perfTiming.navigationStart, output: [] }; for (var c in d.perfTiming) d.perfTiming[c] && "number" == typeof d.perfTiming[c] && (b[c] = d.perfTiming[c] - a, b.output.push({ name: c, "time (ms)": d.perfTiming[c] - a })); return b.output.sort(function(a, b) { return (a["time (ms)"] || 0) - (b["time (ms)"] || 0) }), b.blocks = [f.timeBlock("Total", 0, b.pageLoadTime, "block-total"), f.timeBlock("Unload", b.unloadEventStart, b.unloadEventEnd, "block-unload"), f.timeBlock("Redirect (" + performance.navigation.redirectCount + "x)", b.redirectStart, b.redirectEnd, "block-redirect"), f.timeBlock("App cache", b.fetchStart, b.domainLookupStart, "block-appcache"), f.timeBlock("DNS", b.domainLookupStart, b.domainLookupEnd, "block-dns"), f.timeBlock("TCP", b.connectStart, b.connectEnd, "block-tcp"), f.timeBlock("Time to First Byte", b.requestStart, b.responseStart, "block-ttfb"), f.timeBlock("Response", b.responseStart, b.responseEnd, "block-response"), f.timeBlock("DOM Processing", b.domLoading, b.domComplete, "block-dom"), f.timeBlock("domContentLoaded Event", b.domContentLoadedEventStart, b.domContentLoadedEventEnd, "block-dom-content-loaded"), f.timeBlock("onload Event", b.loadEventStart, b.loadEventEnd, "block-onload")], b.secureConnectionStart && b.blocks.push(f.timeBlock("SSL", b.connectStart, b.secureConnectionStart, "block-ssl")), b.msFirstPaint && b.blocks.push(f.timeBlock("msFirstPaint Event", b.msFirstPaint, b.msFirstPaint, "block-ms-first-paint-event")), b.domInteractive && b.blocks.push(f.timeBlock("domInteractive Event", b.domInteractive, b.domInteractive, "block-dom-interactive-event")), !b.redirectEnd && !b.redirectStart && b.fetchStart > b.navigationStart && b.blocks.push(f.timeBlock("Cross-Domain Redirect (and/or other Delay)", b.navigationStart, b.fetchStart, "block-redirect")), b.blocks.push(f.timeBlock("Network/Server", b.navigationStart, b.responseStart, "block-network-server")), d.measures.forEach(function(a) { b.blocks.push(f.timeBlock("measure:" + a.name, Math.round(a.startTime), Math.round(a.startTime + a.duration), "block-custom-measure")) }), e.logTables([{ name: "Navigation Timeline", data: b.blocks, columns: ["name", "start", "end", "total"] }, { name: "Navigation Events", data: b.output }, { name: "Marks", data: d.marks, columns: ["name", "startTime", "duration"] }]), f.setupTimeLine(Math.round(b.pageLoadTime), b.blocks, d.marks, [], "Navigation Timing") }, b.exports = g }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10, "../helpers/svg": 15, "../helpers/tableLogger": 16, "../helpers/waterfall": 17 }],
    3: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../helpers/dom")),
            e = c(a("../helpers/persistance")),
            f = {};
        f.init = function() { var a = e.persistanceEnabled(),
                b = d.newTag("section", { "class": "page-metric chart-holder" });
            b.appendChild(d.newTag("h3", { text: "Persist Data" })); var c = d.newTag("label", { text: " Persist Data?" }),
                f = d.newTag("input", { type: "checkbox", id: "persist-data-checkbox", checked: a }),
                g = d.newTag("button", { text: "Dumb data to console", disabled: !a }); return f.addEventListener("change", function(a) { var b = a.target.checked;
                b ? (e.activatePersistance(), g.disabled = !1) : window.confirm("this will wipe out all stored data") ? (e.deactivatePersistance(), g.disabled = !0) : a.target.checked = !0 }), c.insertBefore(f, c.firstChild), g.addEventListener("click", function() { e.dump(!1) }), b.appendChild(c), b.appendChild(g), a && e.saveLatestMetrics(), b }, b.exports = f }, { "../helpers/dom": 9, "../helpers/persistance": 12 }],
    4: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../data")),
            e = c(a("../helpers/helpers")),
            f = (c(a("../helpers/svg")), c(a("../helpers/dom"))),
            g = c(a("../helpers/pieChartHelpers")),
            h = {};
        h.init = function() { var a = f.newTag("div", { "class": "pie-charts-holder chart-holder" }),
                b = function(b, c, e, h, i) { var j = f.newTag("div", { "class": "pie-chart-holder", id: i || "" });
                    j.appendChild(f.newTag("h1", { text: b })), j.appendChild(g.createPieChart(c, 400)), j.appendChild(f.newTag("p", { text: "Total Requests: " + d.requestsOnly.length })), e && e.length && e.forEach(function(a) { j.appendChild(f.newTag("p", { text: a }, "margin-top:-1em")) }), j.appendChild(g.createChartTable(b, c, h)), a.appendChild(j) },
                c = d.requestsOnly.length / 100,
                h = "789abcdef",
                i = "789abcdef",
                j = "789abcdef",
                k = d.requestsByDomain.map(function(a) { var b = e.clone(a); return b.perc = b.count / c, b.label = b.domain, b.colour = b.domain === location.host ? "#0c0" : b.domain.split(".").slice(-2).join(".") === location.host.split(".").slice(-2).join(".") ? "#0a0" : e.getRandomColor("56789abcdef", "01234567", "abcdef"), b.id = "reqByDomain-" + b.label.replace(/[^a-zA-Z]/g, "-"), b.durationAverage = Math.round(b.durationTotal / b.count), b.durationTotal = Math.round(b.durationTotal), b.durationTotalParallel = Math.round(b.durationTotalParallel), b }); return b("Requests by Domain", k, ["Domains Total: " + d.requestsByDomain.length], [{ name: "Requests", field: "count" }, { name: "Avg. Duration (ms)", field: "durationAverage" }, { name: "Duration Parallel (ms)", field: "durationTotalParallel" }, { name: "Duration Sum (ms)", field: "durationTotal" }], "pie-request-by-domain"), b("Requests by Initiator Type", d.initiatorTypeCounts.map(function(a) { return a.perc = a.count / c, a.label = a.initiatorType, a.colour = e.getInitiatorOrFileTypeColour(a.initiatorType, e.getRandomColor(h, i, j)), a.id = "reqByInitiatorType-" + a.label.replace(/[^a-zA-Z]/g, "-"), a })), b("Requests by Initiator Type (host/external domain)", d.initiatorTypeCountHostExt.map(function(a) { var b = a.initiatorType.split(" "); return a.perc = a.count / c, a.label = a.initiatorType, a.colour = e.getInitiatorOrFileTypeColour(b[0], e.getRandomColor(h, i, j), "(host)" !== b[1]), a.id = "reqByInitiatorTypeLocEx-" + a.label.replace(/[^a-zA-Z]/g, "-"), a }), ["Requests to Host: " + d.hostRequests, "Host: " + location.host]), b("Requests by File Type", d.fileTypeCounts.map(function(a) { return a.perc = a.count / c, a.label = a.fileType, a.colour = e.getInitiatorOrFileTypeColour(a.fileType, e.getRandomColor(h, i, j)), a.id = "reqByFileType-" + a.label.replace(/[^a-zA-Z]/g, "-"), a })), b("Requests by File Type (host/external domain)", d.fileTypeCountHostExt.map(function(a) { var b = a.fileType.split(" "); return a.perc = a.count / c, a.label = a.fileType, a.colour = e.getInitiatorOrFileTypeColour(b[0], e.getRandomColor(h, i, j), "(host)" !== b[1]), a.id = "reqByFileType-" + a.label.replace(/[^a-zA-Z]/g, "-"), a }), ["Requests to Host: " + d.hostRequests, "Host: " + location.host]), a }, b.exports = h }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10, "../helpers/pieChartHelpers": 13, "../helpers/svg": 15 }],
    5: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../data")),
            e = (c(a("../helpers/helpers")), c(a("../helpers/dom"))),
            f = c(a("../helpers/waterfall")),
            g = {},
            h = function(a) { var b = { pageLoadTime: d.perfTiming.loadEventEnd - d.perfTiming.responseStart, lastResponseEnd: d.perfTiming.loadEventEnd - d.perfTiming.responseStart }; for (var c in d.perfTiming) d.perfTiming[c] && "number" == typeof d.perfTiming[c] && (b[c] = d.perfTiming[c] - d.perfTiming.navigationStart); var e = f.timeBlock("domContentLoaded Event", b.domContentLoadedEventStart, b.domContentLoadedEventEnd, "block-dom-content-loaded"),
                    g = f.timeBlock("Onload Event", b.loadEventStart, b.loadEventEnd, "block-onload"),
                    h = [f.timeBlock("Unload", b.unloadEventStart, b.unloadEventEnd, "block-unload"), f.timeBlock("Redirect", b.redirectStart, b.redirectEnd, "block-redirect"), f.timeBlock("App cache", b.fetchStart, b.domainLookupStart, "block-appcache"), f.timeBlock("DNS", b.domainLookupStart, b.domainLookupEnd, "block-dns"), f.timeBlock("TCP", b.connectStart, b.connectEnd, "block-tcp"), f.timeBlock("Timer to First Byte", b.requestStart, b.responseStart, "block-ttfb"), f.timeBlock("Response", b.responseStart, b.responseEnd, "block-response"), f.timeBlock("DOM Processing", b.domLoading, b.domComplete, "block-dom"), e, g]; return b.secureConnectionStart && h.push(f.timeBlock("SSL", b.connectStart, b.secureConnectionStart, "block-ssl")), b.msFirstPaint && h.push(f.timeBlock("msFirstPaint Event", b.msFirstPaint, b.msFirstPaint, "block-ms-first-paint-event")), b.domInteractive && h.push(f.timeBlock("domInteractive Event", b.domInteractive, b.domInteractive, "block-dom-interactive-event")), !b.redirectEnd && !b.redirectStart && b.fetchStart > b.navigationStart && h.push(f.timeBlock("Cross-Domain Redirect", b.navigationStart, b.fetchStart, "block-redirect")), b.blocks = [f.timeBlock("Navigation API total", 0, b.loadEventEnd, "block-navigation-api-total", h)], d.allResourcesCalc.filter(function(a) { return a.startTime < b.loadEventEnd + 15e3 }).filter(a || function() { return !0 }).forEach(function(a) { var c = [f.timeBlock("Redirect", a.redirectStart, a.redirectEnd, "block-redirect"), f.timeBlock("DNS Lookup", a.domainLookupStart, a.domainLookupEnd, "block-dns"), f.timeBlock("Initial Connection (TCP)", a.connectStart, a.connectEnd, "block-dns"), f.timeBlock("secureConnect", a.secureConnectionStart || void 0, a.connectEnd, "block-ssl"), f.timeBlock("Timer to First Byte", a.requestStart, a.responseStart, "block-ttfb"), f.timeBlock("Content Download", a.responseStart || void 0, a.responseEnd, "block-response")],
                        d = [0, a.redirectStart, a.domainLookupStart, a.connectStart, a.secureConnectionStart, a.requestStart, a.responseStart],
                        e = d.reduce(function(b, c) { return c > 0 && (b > c || 0 >= b) && c != a.startTime ? c : b });
                    a.startTime < e && c.unshift(f.timeBlock("Stalled/Blocking", a.startTime, e, "block-blocking")), b.blocks.push(f.timeBlock(a.name, a.startTime, a.responseEnd, "block-" + a.initiatorType, c, a)), b.lastResponseEnd = Math.max(b.lastResponseEnd, a.responseEnd) }), { loadDuration: Math.round(Math.max(b.lastResponseEnd, d.perfTiming.loadEventEnd - d.perfTiming.navigationStart)), blocks: b.blocks, bg: [e, g] } };
        g.init = function() { var a = h(),
                b = f.setupTimeLine(a.loadDuration, a.blocks, d.marks, a.bg, "Resource Timing"); if (d.requestsByDomain.length > 1) { var c = e.newTag("select", { "class": "domain-selector", onchange: function() { var c = this.options[this.selectedIndex].value;
                        a = "all" === c ? h() : h(function(a) { return a.domain === c }); var e = f.setupTimeLine(a.loadDuration, a.blocks, d.marks, a.bg, "Temp"),
                            g = b.getElementsByClassName("water-fall-chart")[0],
                            i = e.getElementsByClassName("water-fall-chart")[0];
                        b.replaceChild(i, g) } });
                c.appendChild(e.newTag("option", { text: "show all", value: "all" })), d.requestsByDomain.forEach(function(a) { c.appendChild(e.newTag("option", { text: a.domain })) }); var g = b.getElementsByClassName("water-fall-chart")[0];
                g.parentNode.insertBefore(c, g) } return b }, b.exports = g }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10, "../helpers/waterfall": 17 }],
    6: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../data")),
            e = (c(a("../helpers/helpers")), c(a("../helpers/dom"))),
            f = {};
        f.init = function() { var a = function(a, b, c) { c = c || 60; var d = e.newTag("dl", { "class": "summary-tile" }); return d.appendChild(e.newTag("dt", { childElement: a })), d.appendChild(e.newTag("dd", { childElement: b }, "font-size:" + c + "px;")), d },
                b = function(a, b, c) { a.appendChild(e.newTag("dt", { childElement: b })), a.appendChild(e.newTag("dd", { text: c })) },
                c = e.newTag("section", { "class": "tiles-holder chart-holder" }),
                f = e.newTag("dl", { "class": "summary-tile-appendix" }); return [a("Requests", d.requestsOnly.length || "0"), a("Domains", d.requestsByDomain.length || "0"), a(e.combineNodes("Subdomains of ", e.newTag("abbr", { title: "Top Level Domain", text: "TLD" })), d.hostSubdomains || "0"), a(e.combineNodes("Requests to ", e.newTag("span", { title: location.host, text: "Host" })), d.hostRequests || "0"), a(e.combineNodes(e.newTag("abbr", { title: "Top Level Domain", text: "TLD" }), " & Subdomain Requests"), d.currAndSubdomainRequests || "0"), a("Total", d.perfTiming.loadEventEnd - d.perfTiming.navigationStart + "ms", 40), a("Time to First Byte", d.perfTiming.responseStart - d.perfTiming.navigationStart + "ms", 40), a(e.newTag("span", { title: "domLoading to domContentLoadedEventStart", text: "DOM Content Loading" }), d.perfTiming.domContentLoadedEventStart - d.perfTiming.domLoading + "ms", 40), a(e.newTag("span", { title: "domLoading to loadEventStart", text: "DOM Processing" }), d.perfTiming.domComplete - d.perfTiming.domLoading + "ms", 40)].forEach(function(a) { c.appendChild(a) }), d.allResourcesCalc.length > 0 && (c.appendChild(a(e.newTag("span", { title: d.slowestCalls[0].name, text: "Slowest Call" }), e.newTag("span", { title: d.slowestCalls[0].name, text: Math.floor(d.slowestCalls[0].duration) + "ms" }), 40)), c.appendChild(a("Average Call", d.average + "ms", 40))), b(f, e.newTag("abbr", { title: "Top Level Domain", text: "TLD" }, location.host.split(".").slice(-2).join("."))), b(f, e.newTextNode("Host:"), location.host), b(f, e.newTextNode("document.domain:"), document.domain), c.appendChild(f), c }, b.exports = f }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10 }],
    7: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../data")),
            e = (c(a("../helpers/helpers")), c(a("../helpers/dom"))),
            f = {};
        f.init = function() { var a = d.requestsOnly.reduce(function(a, b) { var c, d = a[b.fileType]; return d || (d = a[b.fileType] = { fileType: b.fileType, count: 0, initiatorType: {}, requestsToHost: 0, requestsToExternal: 0 }), c = d.initiatorType[b.initiatorType], c || (c = d.initiatorType[b.initiatorType] = { initiatorType: b.initiatorType, count: 0, requestsToHost: 0, requestsToExternal: 0 }), d.count++, c.count++, b.isRequestToHost ? (d.requestsToHost++, c.requestsToHost++) : (d.requestsToExternal++, c.requestsToExternal++), a }, {}),
                b = e.newTag("section", { "class": "table-section-holder chart-holder" }); return b.appendChild(e.newTag("h1", { text: "Request FileTypes & Initiators" })), b.appendChild(e.tableFactory("filetypes-and-intiators-table", function(a) { return ["FileType", "Count", "Count Internal", "Count External", "Initiator Type", "Count by Initiator Type", "Initiator Type Internal", "Initiator Type External"].forEach(function(b) { a.appendChild(e.newTag("th", { text: b, width: b.indexOf("ternal") > 0 ? "12%" : "" })) }), a }, function(b) { return Object.keys(a).forEach(function(c) { var d = a[c],
                        f = Object.keys(d.initiatorType),
                        g = d.initiatorType[f[0]],
                        h = f.length,
                        i = e.newTag("tr", { "class": "file-type-row " + (d.fileType || "other") + "-light" });
                    [d.fileType, d.count, d.requestsToHost, d.requestsToExternal, g.initiatorType, g.count, g.requestsToHost, g.requestsToExternal].forEach(function(a, b) { var c = { text: a };
                        4 > b && f.length > 1 ? c.rowSpan = h : b >= 4 && (c["class"] = (f[0] || "other") + "-light"), i.appendChild(e.newTag("td", c)) }), b.appendChild(i), f.slice(1).forEach(function(a) { var c = d.initiatorType[a],
                            f = e.newTag("tr", { "class": "initiator-type-more " + (a || "other") + "-light" });
                        f.appendChild(e.newTag("td", { text: a })), f.appendChild(e.newTag("td", { text: c.count })), f.appendChild(e.newTag("td", { text: c.requestsToHost })), f.appendChild(e.newTag("td", { text: c.requestsToExternal })), b.appendChild(f) }) }), b })), b }, b.exports = f }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10 }],
    8: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("./helpers/helpers")),
            e = { resources: [], marks: [], measures: [], perfTiming: [], allResourcesCalc: [] },
            f = !0; if (e.isValid = function() { return f }, window.performance && void 0 !== window.performance.getEntriesByType) e.resources = window.performance.getEntriesByType("resource"), e.marks = window.performance.getEntriesByType("mark"), e.measures = window.performance.getEntriesByType("measure");
        else { if (!window.performance || void 0 === window.performance.webkitGetEntriesByType) return alert("Oups, looks like this browser does not support the Resource Timing API\ncheck http://caniuse.com/#feat=resource-timing to see the ones supporting it \n\n"), void(f = !1);
            e.resources = window.performance.webkitGetEntriesByType("resource"), e.marks = window.performance.webkitGetEntriesByType("mark"), e.measures = window.performance.webkitGetEntriesByType("measure") } if (!window.performance.timing) return alert("Oups, looks like this browser does not support performance timing"), void(f = !1); if (e.perfTiming = window.performance.timing, e.perfTiming.loadEventEnd - e.perfTiming.navigationStart < 0) return alert("Page is still loading - please try again when page is loaded."), void(f = !1);
        e.allResourcesCalc = e.resources.filter(function(a) { return !a.name.match(/http[s]?\:\/\/(micmro|nurun).github.io\/performance-bookmarklet\/.*/) }).map(function(a) { var b, c, e, f = 0 === a.name.indexOf("http");
            f ? (b = a.name.match(/:\/\/(.[^\/]+)([^?]*)\??(.*)/), c = b[2].split("/").pop(), e = c.substr((Math.max(0, c.lastIndexOf(".")) || 1 / 0) + 1)) : (b = ["", location.host], e = a.name.split(":")[0]); var g = { name: a.name, domain: b[1], initiatorType: a.initiatorType || e || "SourceMap or Not Defined", fileExtension: e || "XHR or Not Defined", loadtime: a.duration, fileType: d.getFileType(e, a.initiatorType), isRequestToHost: b[1] === location.host }; for (var h in a) "function" != typeof a[h] && (g[h] = a[h]); return a.requestStart && (g.requestStartDelay = a.requestStart - a.startTime, g.dns = a.domainLookupEnd - a.domainLookupStart, g.tcp = a.connectEnd - a.connectStart, g.ttfb = a.responseStart - a.startTime, g.requestDuration = a.responseStart - a.requestStart), a.secureConnectionStart && (g.ssl = a.connectEnd - a.secureConnectionStart), g }), e.requestsOnly = e.allResourcesCalc.filter(function(a) { return 0 === a.name.indexOf("http") && !a.name.match(/js.map$/) }), e.initiatorTypeCounts = d.getItemCount(e.requestsOnly.map(function(a) { return a.initiatorType || a.fileExtension }), "initiatorType"), e.initiatorTypeCountHostExt = d.getItemCount(e.requestsOnly.map(function(a) { return (a.initiatorType || a.fileExtension) + " " + (a.isRequestToHost ? "(host)" : "(external)") }), "initiatorType"), e.requestsByDomain = d.getItemCount(e.requestsOnly.map(function(a) { return a.domain }), "domain"), e.fileTypeCountHostExt = d.getItemCount(e.requestsOnly.map(function(a) { return a.fileType + " " + (a.isRequestToHost ? "(host)" : "(external)") }), "fileType"), e.fileTypeCounts = d.getItemCount(e.requestsOnly.map(function(a) { return a.fileType }), "fileType"); var g = {};
        e.requestsOnly.forEach(function(a) { var b = e.requestsByDomain.filter(function(b) { return b.domain == a.domain })[0] || {},
                c = g[a.domain] || 0;
            a.duration = b.duration || a.responseEnd - a.startTime, c <= a.startTime ? b.durationTotalParallel = (b.durationTotalParallel || 0) + a.duration : c < a.responseEnd && (b.durationTotalParallel = (b.durationTotalParallel || 0) + (a.responseEnd - c)), g[a.domain] = a.responseEnd || 0, b.durationTotal = (b.durationTotal || 0) + a.duration }), e.hostRequests = e.requestsOnly.filter(function(a) { return a.domain === location.host }).length, e.currAndSubdomainRequests = e.requestsOnly.filter(function(a) { return a.domain.split(".").slice(-2).join(".") === location.host.split(".").slice(-2).join(".") }).length, e.crossDocDomainRequests = e.requestsOnly.filter(function(a) { return !d.endsWith(a.domain, document.domain) }).length, e.hostSubdomains = e.requestsByDomain.filter(function(a) { return d.endsWith(a.domain, location.host.split(".").slice(-2).join(".")) && a.domain !== location.host }).length, e.slowestCalls = [], e.average = void 0, e.allResourcesCalc.length > 0 && (e.slowestCalls = e.allResourcesCalc.filter(function(a) { return a.name !== location.href }).sort(function(a, b) { return b.duration - a.duration }), e.average = Math.floor(e.slowestCalls.reduceRight(function(a, b) { return "number" != typeof a ? a.duration + b.duration : a + b.duration }) / e.slowestCalls.length)), b.exports = e }, { "./helpers/helpers": 10 }],
    9: [function(a, b) { "use strict"; var c = {};
        c.newTextNode = function(a) { return document.createTextNode(a) }, c.newTag = function(a, b, d) { b = b || {}; var e = document.createElement(a); for (var f in b) "text" != f && (e[f] = b[f]); return b.text ? e.textContent = b.text : b.childElement && ("object" == typeof b.childElement ? b.childElement instanceof NodeList ? Array.prototype.slice.call(b.childElement, 0).forEach(function(a) { e.appendChild(a) }) : e.appendChild(b.childElement) : e.appendChild(c.newTextNode(b.childElement))), b["class"] && (e.className = b["class"]), e.style.cssText = d || "", e }, c.tableFactory = function(a, b, d) { var e = c.newTag("div", { id: a || "", "class": "table-holder" }),
                f = c.newTag("table"),
                g = c.newTag("thead"); return g.appendChild(b(c.newTag("tr"))), f.appendChild(g), f.appendChild(d(c.newTag("tbody"))), e.appendChild(f), e }, c.combineNodes = function(a, b) { var d = document.createElement("div"); return "object" == typeof a ? d.appendChild(a) : "string" == typeof a && d.appendChild(c.newTextNode(a)), "object" == typeof b ? d.appendChild(b) : "string" == typeof b && d.appendChild(c.newTextNode(b)), d.childNodes }, c.addClass = function(a, b) { return a.classList ? a.classList.add(b) : a.setAttribute("class", a.getAttribute("class") + " " + b), a }, c.removeClass = function(a, b) { return a.classList ? a.classList.remove(b) : a.setAttribute("class", a.getAttribute("class").replace(new RegExp("(\\s|^)" + b + "(\\s|$)", "g"), "$2")), a }, b.exports = c }, {}],
    10: [function(a, b) { "use strict"; var c = {};
        c.getFileType = function(a, b) { if (a) switch (a) {
                case "jpg":
                case "jpeg":
                case "png":
                case "gif":
                case "webp":
                case "svg":
                case "ico":
                    return "image";
                case "js":
                    return "js";
                case "css":
                    return "css";
                case "html":
                    return "html";
                case "woff":
                case "woff2":
                case "ttf":
                case "eot":
                case "otf":
                    return "font";
                case "swf":
                    return "flash";
                case "map":
                    return "source-map" }
            if (b) switch (b) {
                case "xmlhttprequest":
                    return "ajax";
                case "img":
                    return "image";
                case "script":
                    return "js";
                case "internal":
                case "iframe":
                    return "html";
                default:
                    return "other" }
            return b }, c.getRandomColor = function(a, b, c) { for (var d = [a || "0123456789ABCDEF", b || "0123456789ABCDEF", c || "0123456789ABCDEF"], e = "#", f = 0, g = 0; 6 > g; g++) f = Math.floor(g / 2), e += d[f].split("")[Math.floor(Math.random() * d[f].length)]; return e }, c.endsWith = function(a, b) { return -1 !== a.indexOf(b, a.length - b.length) }; var d = function(a, b) { var c = (parseInt(a.substr(1, 2), 16) + b).toString(16),
                d = (parseInt(a.substr(3, 2), 16) + b).toString(16),
                e = (parseInt(a.substr(5, 2), 16) + b).toString(16); return "#" + c + d + e };
        c.getInitiatorOrFileTypeColour = function(a, b, c) { var e = b || "#bebebe"; switch (a) {
                case "css":
                    e = "#afd899"; break;
                case "iframe":
                case "html":
                    e = "#85b3f2"; break;
                case "img":
                case "image":
                    e = "#bc9dd6"; break;
                case "script":
                case "js":
                    e = "#e7bd8c"; break;
                case "link":
                    e = "#89afe6"; break;
                case "swf":
                    e = "#4db3ba"; break;
                case "font":
                    e = "#e96859"; break;
                case "xmlhttprequest":
                case "ajax":
                    e = "#e7d98c" } return c === !0 ? d(e, -5) : e }, c.getItemCount = function(a, b) { var c, d = {},
                e = [];
            a.forEach(function(a) { d[a] = d[a] ? d[a] + 1 : 1 }); for (var f in d) c = {}, c[b || "key"] = f, c.count = d[f], e.push(c); return e.sort(function(a, b) { return a.count < b.count ? 1 : -1 }) }, c.clone = function(a) { var b; if (null == a || "object" != typeof a) return a; if (a instanceof Date) return b = new Date, b.setTime(a.getTime()), b; if (a instanceof Array) { b = []; for (var d = 0, e = a.length; e > d; d++) b[d] = c.clone(a[d]); return b } if (a instanceof Object) { b = {}; for (var f in a) a.hasOwnProperty(f) && (b[f] = c.clone(a[f])); return b } throw new Error("Unable to helper.clone obj") }, b.exports = c }, {}],
    11: [function(a, b) { "use strict"; var c, d, e, f, g = function(a) { return a && a.__esModule ? a["default"] : a },
            h = g(a("../helpers/dom")),
            i = a("../helpers/style").style,
            j = {},
            k = function() { if (e)
                    for (f = d.getElementById("perfbook-content"); f.firstChild;) f.removeChild(f.firstChild);
                else { e = h.newTag("div", { id: "perfbook-holder" }), f = h.newTag("div", { id: "perfbook-content" }), window.outputContent; var a = h.newTag("button", { "class": "perfbook-close", text: "close" });
                    a.addEventListener("click", function() { c.parentNode.removeChild(c) }), e.appendChild(a), e.appendChild(f) } },
            l = function(a) { f.appendChild(a) };
        j.setup = function(a) { c = document.getElementById("perfbook-iframe"); var b = function() { k(), a(l), d.body.appendChild(e), c.style.height = "hidden" != getComputedStyle(document.body).overflow ? e.clientHeight + 36 + "px" : "100%" };
            c ? (d = c.contentWindow.document, e = d.getElementById("perfbook-holder"), k(), a(l), b()) : (c = h.newTag("iframe", { id: "perfbook-iframe", onload: function() { d = c.contentWindow.document; var a = h.newTag("style", { type: "text/css", text: i });
                    d.head.appendChild(a), b() } }, "position:absolute; top:1%; right:1%; margin-bottom:1em; left:1%; z-index:6543210; width:98%; border:0; box-shadow:0 0 25px 0 rgba(0,0,0,0.5); background:#fff;"), document.body.appendChild(c)) }, j.getOutputIFrame = function() { return d }, b.exports = j }, { "../helpers/dom": 9, "../helpers/style": 14 }],
    12: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = (c(a("../helpers/dom")), c(a("../data"))),
            e = "performance-bookmarklet-metrics",
            f = {},
            g = function() { return { timestamp: new Date(d.perfTiming.navigationStart).toISOString(), url: window.location.href, requests: d.requestsOnly.length, domains: d.requestsByDomain.length, subDomainsOfTld: d.hostSubdomains, requestsToHost: d.hostRequests, tldAndSubdomainRequests: d.currAndSubdomainRequests, total: d.perfTiming.loadEventEnd - d.perfTiming.navigationStart, timeToFirstByte: d.perfTiming.responseStart - d.perfTiming.navigationStart, domContentLoading: d.perfTiming.domContentLoadedEventStart - d.perfTiming.domLoading, domProcessing: d.perfTiming.domComplete - d.perfTiming.domLoading } },
            h = function() { return JSON.parse(localStorage.getItem(e)) || [] };
        f.persistanceEnabled = function() { return !!JSON.parse(localStorage.getItem(e)) }, f.activatePersistance = function() { f.saveLatestMetrics() }, f.deactivatePersistance = function() { f.dump() }, f.saveLatestMetrics = function() { var a = h();
            a.push(g()), localStorage.setItem(e, JSON.stringify(a)) }, f.dump = function() { var a = void 0 === arguments[0] ? !0 : arguments[0],
                b = h(); return 0 === b.length ? void console.log("There are no page metrics. Please tick the 'Persist Data' checkbox.") : (a === !0 && (localStorage.removeItem(e), console.log("Storage for %s has been cleared", e)), window.PerformanceBookmarklet = { persistedData: b }, void(console.table ? (console.log("Data also accessible via %cwindow.PerformanceBookmarklet.persistedData%c:\n\n%o", "font-family:monospace", "font-family:inherit", window.PerformanceBookmarklet), console.table(b)) : (console.log("Data also accessible via window.PerformanceBookmarklet.persistedData"), console.dir(window.PerformanceBookmarklet.persistedData)))) }, b.exports = f }, { "../data": 8, "../helpers/dom": 9 }],
    13: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = (c(a("../data")), c(a("../helpers/helpers"))),
            e = c(a("../helpers/svg")),
            f = c(a("../helpers/dom")),
            g = {},
            h = 2 * Math.PI / 100,
            i = function(a, b, c, d, f, g) { var i = b / 2,
                    j = c + (d * h - .001),
                    k = c + (d / 2 * h - .001),
                    l = i + i * Math.sin(c),
                    m = i - i * Math.cos(c),
                    n = i + i * Math.sin(j),
                    o = i - i * Math.cos(j),
                    p = i + .85 * i * Math.sin(k),
                    q = i - .85 * i * Math.cos(k),
                    r = j - c > Math.PI ? 1 : 0,
                    s = "M " + i + "," + i + " L " + l + "," + m + " A " + i + "," + i + " 0 " + r + " 1 " + n + "," + o + " Z",
                    t = e.newEl("path", { id: a, d: s, fill: g }); if (t.appendChild(e.newEl("title", { text: f })), t.addEventListener("mouseenter", function(a) { a.target.style.opacity = "0.5", a.target.ownerDocument.getElementById(a.target.getAttribute("id") + "-table").style.backgroundColor = "#ccc" }), t.addEventListener("mouseleave", function(a) { a.target.style.opacity = "1", a.target.ownerDocument.getElementById(a.target.getAttribute("id") + "-table").style.backgroundColor = "transparent" }), d > 10) { var u = e.newTextEl(f, q); return k < Math.PI ? u.setAttribute("x", p - e.getNodeTextWidth(u)) : u.setAttribute("x", p), { path: t, wedgeLabel: u, endAngle: j } } return { path: t, endAngle: j } },
            j = function() { var a = .98 * window.innerWidth - 64; return 700 > a ? 350 : 800 > a ? a / 2 - 72 : a / 3 - 72 }();
        g.createPieChart = function(a, b) { var c = 0,
                f = e.newEl("svg:svg", { viewBox: "0 0 " + b + " " + b, "class": "pie-chart" }, "max-height:" + j + "px;"),
                g = e.newEl("g", {}, "pointer-events:none; font-weight:bold;"),
                h = e.newEl("g"); return a.forEach(function(a) { var e = i(a.id, b, c, a.perc, a.label + " (" + a.count + ")", a.colour || d.getRandomColor());
                h.appendChild(e.path), c = e.endAngle, e.wedgeLabel && g.appendChild(e.wedgeLabel) }), h.appendChild(e.newEl("circle", { cx: b / 2, cy: b / 2, r: .05 * b, fill: "#fff" })), f.appendChild(h), f.appendChild(g), f }, g.createChartTable = function(a, b, c) { return c = c || [{ name: "Requests", field: "count" }], f.tableFactory("", function(b) { return b.appendChild(f.newTag("th", { text: a, "class": "text-left" })), c.forEach(function(a) { b.appendChild(f.newTag("th", { text: a.name, "class": "text-right" })) }), b.appendChild(f.newTag("th", { text: "Percentage", "class": "text-right" })), b }, function(a) { return b.forEach(function(b) { var d = f.newTag("tr", { id: b.id + "-table" });
                    d.appendChild(f.newTag("td", { text: b.label })), c.forEach(function(a) { d.appendChild(f.newTag("td", { text: b[a.field].toString(), "class": "text-right" })) }), d.appendChild(f.newTag("td", { text: b.perc.toPrecision(2) + "%", "class": "text-right" })), a.appendChild(d) }), a }) }, b.exports = g }, { "../data": 8, "../helpers/dom": 9, "../helpers/helpers": 10, "../helpers/svg": 15 }],
    14: [function(a, b, c) {
        "use strict";
        Object.defineProperty(c, "__esModule", { value: !0 });
        var d = "body {overflow: auto; background: #fff; font:normal 12px/18px sans-serif; color:#333;} * {box-sizing:border-box;} svg {font:normal 12px/18px sans-serif;} th {text-align: left;} button {cursor:pointer;} button:disabled {cursor:default;} #perfbook-holder {overflow: hidden; width:100%; padding:1em 2em;} #perfbook-content {position:relative;} .perfbook-close {position:absolute; top:0; right:0; padding:1em; z-index:1; background:transparent; border:0; cursor:pointer;} .full-width {width:100%;} .chart-holder {margin: 5em 0;} h1 {font:bold 18px/18px sans-serif; margin:1em 0; color:#666;} .text-right {text-align: right;} .text-left {text-align: left;} .css {background: #afd899;} .iframe, .html, .internal {background: #85b3f2;} .img, .image {background: #bc9dd6;} .script, .js {background: #e7bd8c;} .link {background: #89afe6;} .swf, .flash {background: #4db3ba;} .font {background: #e96859;} .xmlhttprequest, .ajax {background: #e7d98c;} .other {background: #bebebe;} .css-light {background: #b9cfa0;} .iframe-light, .html-light, .internal-light {background: #c2d9f9;} .img-light, .image-light {background: #deceeb;} .script-light, .js-light {background: #f3dec6;} .link-light {background: #c4d7f3;} .swf-light, .flash-light {background: #a6d9dd;} .font-light {background: #f4b4ac;} .xmlhttprequest-light, .ajax-light {background: #f3ecc6;} .other-light {background: #dfdfdf;} .block-css {fill: #afd899;} .block-iframe, .block-html, .block-internal {fill: #85b3f2;} .block-img, .block-image {fill: #bc9dd6;} .block-script, .block-js {fill: #e7bd8c;} .block-link {fill: #89afe6;} .block-swf, .block-flash {fill: #4db3ba;} .block-font {fill: #e96859;} .block-xmlhttprequest, .block-ajax {fill: #e7d98c;} .block-other {fill: #bebebe;} .block-total {fill: #ccc;} .block-unload {fill: #909;} .block-redirect {fill: #ffff60;} .block-appcache {fill: #1f831f;} .block-dns {fill: #1f7c83;} .block-tcp {fill: #e58226;} .block-ttfb {fill: #1fe11f;} .block-response {fill: #1977dd;} .block-dom {fill: #9cc;} .block-dom-content-loaded {fill: #d888df;} .block-onload {fill: #c0c0ff;} .block-ssl {fill: #c141cd; } .block-ms-first-paint-event {fill: #8fbc83; } .block-dom-interactive-event {fill: #d888df; } .block-network-server {fill: #8cd18c; } .block-custom-measure {fill: #f00; } .block-navigation-api-total {fill: #ccc;} .block-blocking {fill: #cdcdcd;} .block-undefined {fill: #0f0;} .tiles-holder {margin: 2em -18px 2em 0; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-flow: row wrap; flex-flow: row wrap; } .summary-tile { flex-grow: 1; width:250px; background:#ddd; padding: 1em; margin:0 18px 1em 0; color:#666; text-align:center;} .summary-tile dt {font-weight:bold; font-size:16px; display:block; line-height:1.2em; min-height:2.9em; padding:0 0 0.5em;} .summary-tile dd {font-weight:bold; line-height:60px; margin:0;} .summary-tile-appendix {float:left; clear:both; width:100%; font-size:10px; line-height:1.1em; color:#666;} .summary-tile-appendix dt {float:left; clear:both;} .summary-tile-appendix dd {float:left; margin:0 0 0 1em;} .pie-charts-holder {margin-right: -72px; display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-flow: row wrap; flex-flow: row wrap;} .pie-chart-holder {flex-grow: 1; width:350px; max-width: 600px; margin: 0 72px 0 0;} .pie-chart-holder h1 {min-height:2em;} .pie-chart {width:100%;} .table-holder {overflow-x:auto} .table-holder table {float:left; width:100%; font-size:12px; line-height:18px;} .table-holder th, .table-holder td {line-height: 1em; margin:0; padding:0.25em 0.5em 0.25em 0;} #pie-request-by-domain {flex-grow: 2; width:772px; max-width: 1272px;} #filetypes-and-intiators-table {margin: 2em 0 5em;} #filetypes-and-intiators-table table {vertical-align: middle; border-collapse: collapse;} #filetypes-and-intiators-table td {padding:0.5em; border-right: solid 1px #fff;} #filetypes-and-intiators-table td:last-child {padding-right: 0; border-right:0;} #filetypes-and-intiators-table .file-type-row td {border-top: solid 10px #fff;} #filetypes-and-intiators-table .file-type-row:first-child td {border-top: none;} .water-fall-holder {fill:#ccc;} .water-fall-chart {width:100%; background:#f0f5f0;} .water-fall-chart .marker-holder {width:100%;} .water-fall-chart .line-holder {stroke-width:1; stroke: #ccc; stroke-opacity:0.5;} .water-fall-chart .line-holder.active {stroke: #69009e; stroke-width:2; stroke-opacity:1;} .water-fall-chart .labels {width:100%;} .water-fall-chart .labels .inner-label {pointer-events: none;} .water-fall-chart .time-block.active {opacity: 0.8;} .water-fall-chart .line-end, .water-fall-chart .line-start {display: none; stroke-width:1; stroke-opacity:0.5; stroke: #000;} .water-fall-chart .line-end.active, .water-fall-chart .line-start.active {display: block;} .water-fall-chart .mark-holder text {-webkit-writing-mode: tb; writing-mode:vertical-lr; writing-mode: tb;} .time-scale line {stroke:#0cc; stroke-width:1;} .time-scale text {font-weight:bold;} .domain-selector {float:right; margin: -35px 0 0 0;} .navigation-timing {} .legends-group { display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; -webkit-flex-flow: row wrap; flex-flow: row wrap; } .legends-group .legend-holder { flex-grow: 1; width:250px; padding:0 1em 1em; } .legends-group .legend-holder h4 { margin: 0; padding: 0; } .legend dt {float: left; clear: left; padding: 0 0 0.5em;} .legend dd {float: left; display: inline-block; margin: 0 1em; line-height: 1em;} .legend .colorBoxHolder span {display: inline-block; width: 15px; height: 1em;} .page-metric {} .page-metric button {margin-left: 2em;}";

        c.style = d
    }, {}],
    15: [function(a, b) { "use strict"; var c = a("../helpers/iFrameHolder").getOutputIFrame,
            d = {};
        d.newEl = function(a, b, c) { var d = document.createElementNS("http://www.w3.org/2000/svg", a);
            b = b || {}; for (var e in b) "text" != e && d.setAttributeNS(null, e, b[e]); return d.textContent = b.text || "", d.style.cssText = c || "", d }, d.newTextEl = function(a, b, c) { return d.newEl("text", { fill: "#111", y: b, text: a }, (c || "") + " text-shadow:0 0 4px #fff;") }, d.getNodeTextWidth = function(a) { var b = d.newEl("svg:svg", {}, "visibility:hidden;");
            b.appendChild(a), c().body.appendChild(b); var e = a.getBBox().width; return b.parentNode.removeChild(b), e }, b.exports = d }, { "../helpers/iFrameHolder": 11 }],
    16: [function(a, b) { "use strict"; var c = {};
        c.logTable = function(a) { a.data.length > 0 && console.table && (console.log("\n\n\n" + a.name + ":"), console.table(a.data, a.columns)) }, c.logTables = function(a) { a.forEach(c.logTable) }, b.exports = c }, {}],
    17: [function(a, b) { "use strict"; var c = function(a) { return a && a.__esModule ? a["default"] : a },
            d = c(a("../helpers/svg")),
            e = c(a("../helpers/dom")),
            f = {};
        f.timeBlock = function(a, b, c, d, e, f) { return { name: a, start: b, end: c, total: "number" != typeof b || "number" != typeof c ? void 0 : c - b, cssClass: d, segments: e, rawResource: f } }, f.setupTimeLine = function(a, b, c, f, g) { var h = a / 100,
                i = b.filter(function(a) { return "number" == typeof a.start && "number" == typeof a.total }).sort(function(a, b) { return (a.start || 0) - (b.start || 0) }),
                j = c.length > 0 ? c.reduce(function(a, b) { return Math.max("number" == typeof a ? a : 0, d.getNodeTextWidth(d.newTextEl(b.name, "0"))) }) : 0,
                k = 25 * (i.length + 1),
                l = k + j + 35,
                m = e.newTag("section", { "class": "resource-timing water-fall-holder chart-holder" }),
                n = d.newEl("svg:svg", { height: Math.floor(l), "class": "water-fall-chart" }),
                o = d.newEl("g", { "class": "labels" }),
                p = d.newEl("line", { x1: "0", y1: "0", x2: "0", y2: k, "class": "line-end" }),
                q = d.newEl("line", { x1: "0", y1: "0", x2: "0", y2: k, "class": "line-start" }),
                r = function(a) { var b = a.target;
                    e.addClass(b, "active"); var c = b.x.baseVal.valueInSpecifiedUnits + b.width.baseVal.valueInSpecifiedUnits + "%",
                        d = b.x.baseVal.valueInSpecifiedUnits + "%";
                    p.x1.baseVal.valueAsString = c, p.x2.baseVal.valueAsString = c, q.x1.baseVal.valueAsString = d, q.x2.baseVal.valueAsString = d, e.addClass(p, "active"), e.addClass(q, "active"), b.parentNode.appendChild(p), b.parentNode.appendChild(q) },
                s = function(a) { e.removeClass(a.target, "active"), e.removeClass(p, "active"), e.removeClass(q, "active") },
                t = function(a) { var b = function() { return a.apply(this, arguments) }; return b.toString = function() { return a.toString() }, b }(function(a, b, c, e, f, g, i) { var j, k = d.newEl("rect", { width: a / h + "%", height: b - 1, x: Math.round(c / h * 100) / 100 + "%", y: e, "class": (i && i.length > 0 ? "time-block" : "segment") + " " + (f || "block-undefined") }); return g && k.appendChild(d.newEl("title", { text: g })), k.addEventListener("mouseenter", r), k.addEventListener("mouseleave", s), i && i.length > 0 ? (j = d.newEl("g"), j.appendChild(k), i.forEach(function(a) { a.total > 0 && "number" == typeof a.start && j.appendChild(t(a.total, 8, a.start || .001, e, a.cssClass, a.name + " (" + Math.round(a.start) + "ms - " + Math.round(a.end) + "ms | total: " + Math.round(a.total) + "ms)")) }), j) : k }),
                u = function(a) { var b = d.newEl("rect", { width: (a.total || 1) / h + "%", height: k, x: (a.start || .001) / h + "%", y: 0, "class": a.cssClass || "block-undefined" }); return b.appendChild(d.newEl("title", { text: a.name })), b },
                v = function() { for (var b = d.newEl("g", { "class": "time-scale full-width" }), c = 0, e = a / 1e3, f = 100 / e; e >= c; c++) { var g = d.newTextEl(c + "sec", k);
                        c > e - .2 ? (g.setAttribute("x", f * c - .5 + "%"), g.setAttribute("text-anchor", "end")) : g.setAttribute("x", f * c + .5 + "%"); var h = d.newEl("line", { x1: f * c + "%", y1: "0", x2: f * c + "%", y2: k });
                        b.appendChild(h), b.appendChild(g) } return b },
                w = function() { var a = d.newEl("g", { transform: "scale(1, 1)", "class": "marker-holder" }); return c.forEach(function(b, f) { var g = b.startTime / h,
                            i = d.newEl("g", { "class": "mark-holder" }),
                            j = d.newEl("g", { "class": "line-holder" }),
                            l = d.newEl("g", { "class": "line-lable-holder", x: g + "%" });
                        b.x = g; var m = d.newTextEl(b.name, k + 25);
                        m.setAttribute("x", g + "%"), m.setAttribute("stroke", ""), j.appendChild(d.newEl("line", { x1: g + "%", y1: 0, x2: g + "%", y2: k })), c[f - 1] && b.x - c[f - 1].x < 1 && (m.setAttribute("x", c[f - 1].x + 1 + "%"), b.x = c[f - 1].x + 1), j.appendChild(d.newEl("line", { x1: g + "%", y1: k, x2: b.x + "%", y2: k + 23 })); var n = !1,
                            o = function() { n || (n = !0, e.addClass(j, "active"), i.parentNode.appendChild(i)) },
                            p = function() { n = !1, e.removeClass(j, "active") };
                        m.addEventListener("mouseenter", o), m.addEventListener("mouseleave", p), l.appendChild(m), i.appendChild(d.newEl("title", { text: b.name + " (" + Math.round(b.startTime) + "ms)" })), i.appendChild(j), a.appendChild(i), i.appendChild(l) }), a }; return n.appendChild(v()), n.appendChild(w()), f.forEach(function(a) { n.appendChild(u(a)) }), i.forEach(function(a, b) { var c = a.total || 1,
                    e = 25 * b;
                n.appendChild(t(c, 25, a.start || .001, e, a.cssClass, a.name + " (" + a.start + "ms - " + a.end + "ms | total: " + a.total + "ms)", a.segments)); var f = d.newTextEl(a.name + " (" + Math.round(a.total) + "ms)", e + (a.segments ? 20 : 17));
                (a.total || 1) / h > 10 && d.getNodeTextWidth(f) < 200 ? (f.setAttribute("class", "inner-label"), f.setAttribute("x", (a.start || .001) / h + .5 + "%"), f.setAttribute("width", c / h + "%")) : (a.start || .001) / h + c / h < 80 ? f.setAttribute("x", (a.start || .001) / h + c / h + .5 + "%") : (f.setAttribute("x", (a.start || .001) / h - .5 + "%"), f.setAttribute("text-anchor", "end")), f.style.opacity = a.name.match(/js.map$/) ? "0.5" : "1", o.appendChild(f) }), n.appendChild(o), g && m.appendChild(e.newTag("h1", { text: g })), m.appendChild(n), m }, b.exports = f }, { "../helpers/dom": 9, "../helpers/svg": 15 }],
    18: [function(a) { "use strict"; { var b = function(a) { return a && a.__esModule ? a["default"] : a },
                c = b(a("./data")),
                d = b(a("./helpers/iFrameHolder")),
                e = b(a("./components/summaryTiles")),
                f = b(a("./components/navigationTimeline")),
                g = b(a("./components/pieChart")),
                h = b(a("./components/table")),
                i = b(a("./components/resourcesTimeline")),
                j = b(a("./components/legend")),
                k = b(a("./components/pageMetric"));
            b(a("./logger")) } if ("about:" !== location.protocol && c.isValid()) { var l = function(a) {
                [e.init(), f.init(), g.init(), h.init(), i.init(), j.init(), k.init()].forEach(function(b) { a(b) }) };
            d.setup(l) } }, { "./components/legend": 1, "./components/navigationTimeline": 2, "./components/pageMetric": 3, "./components/pieChart": 4, "./components/resourcesTimeline": 5, "./components/summaryTiles": 6, "./components/table": 7, "./data": 8, "./helpers/iFrameHolder": 11, "./logger": 19 }],
    19: [function(a) { "use strict"; var b = function(a) { return a && a.__esModule ? a["default"] : a },
            c = b(a("./data")),
            d = b(a("./helpers/tableLogger"));
        d.logTable({ name: "All loaded resources", data: c.allResourcesCalc, columns: ["name", "domain", "fileType", "initiatorType", "fileExtension", "loadtime", "isRequestToHost", "requestStartDelay", "dns", "tcp", "ttfb", "requestDuration", "ssl"] }), d.logTables([{ name: "Requests by domain", data: c.requestsByDomain }, { name: "Requests by Initiator Type", data: c.initiatorTypeCounts, columns: ["initiatorType", "count", "perc"] }, { name: "Requests by Initiator Type (host/external domain)", data: c.initiatorTypeCountHostExt, columns: ["initiatorType", "count", "perc"] }, { name: "Requests by File Type", data: c.fileTypeCounts, columns: ["fileType", "count", "perc"] }]) }, { "./data": 8, "./helpers/tableLogger": 16 }]
}, {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);