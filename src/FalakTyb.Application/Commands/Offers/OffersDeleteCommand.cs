using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
