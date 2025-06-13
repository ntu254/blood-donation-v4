package com.hicode.backend.controller;

import com.hicode.backend.dto.admin.BloodCompatibilityDetailResponse;
import com.hicode.backend.service.BloodManagementService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(BloodCompatibilityController.class)
class BloodCompatibilityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BloodManagementService bloodManagementService;

    @Test
    void getAllCompatibilityRulesReturnsOk() throws Exception {
        BloodCompatibilityDetailResponse r1 = new BloodCompatibilityDetailResponse();
        r1.setId(1);
        BloodCompatibilityDetailResponse r2 = new BloodCompatibilityDetailResponse();
        r2.setId(2);
        Page<BloodCompatibilityDetailResponse> page = new PageImpl<>(Arrays.asList(r1, r2));

        Mockito.when(bloodManagementService.getAllCompatibilityRules(Mockito.any(Pageable.class)))
                .thenReturn(page);

        mockMvc.perform(get("/api/blood-compatibility")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(page.getContent().size()))
                .andExpect(jsonPath("$.content[0].id").value(1));

        Mockito.verify(bloodManagementService).getAllCompatibilityRules(Mockito.any(Pageable.class));
    }
}
