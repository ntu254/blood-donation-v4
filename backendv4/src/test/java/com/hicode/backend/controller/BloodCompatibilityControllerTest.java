package com.hicode.backend.controller;

import com.hicode.backend.dto.BloodCompatibilityDetailResponse;
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

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BloodCompatibilityController.class)
class BloodCompatibilityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BloodManagementService bloodManagementService;

    @Test
    void getAllCompatibilityRulesReturnsOk() throws Exception {
        Page<BloodCompatibilityDetailResponse> page = new PageImpl<>(Collections.emptyList());
        Mockito.when(bloodManagementService.getAllCompatibilityRules(Mockito.any(Pageable.class)))
                .thenReturn(page);

        mockMvc.perform(get("/api/blood-compatibility")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
