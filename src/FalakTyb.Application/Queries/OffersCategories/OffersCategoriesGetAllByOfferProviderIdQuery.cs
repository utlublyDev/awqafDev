
using awqaf.Domain;
using awqaf.Dto;
using MediatR;
using JHipsterNet.Core.Pagination;
using System.Collections.Generic;

namespace awqaf.Application.Queries

{
    public class OffersCategoriesGetAllByOfferProviderIdQuery :  IRequest<List<CategoriesWithListOffers>>
    {
       public IPageable Page { get; set; }

        public long OfferProviderId { get; set; }

    }
}
